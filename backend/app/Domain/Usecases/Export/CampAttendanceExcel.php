<?php

namespace App\Domain\Usecases\Export;

use App\Domain\Entities\Camp\Camp;
use App\Domain\Entities\CampAttendance\Attendances;
use App\Domain\Gateway\CampAttendancesGateway;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class CampAttendanceExcel
{
    private CampAttendancesGateway $repositry;

    // activeなシート
    private $activeSheet;

    public function __construct(CampAttendancesGateway $repositry)
    {
        $this->repositry = $repositry;
    }

    /**
     * @param int $campId
     * @return string
     */
    public function handle($campId)
    {
        $campAttendance = $this->repositry->getByCampId($campId);
        $camp = $campAttendance->getCamp();

        // テンプレートを読み込み
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(base_path('app/Domain/Usecases/Export/CampAttendanceFormat.xlsx'));

        // シートの設定
        $this->activeSheet = $spreadsheet->getSheet(1);

        // シートに値を設定
        foreach ($campAttendance->getAttendances() as $index => $attendances) {
            $this->setRowValue($attendances, $camp, $index);
        }

        // 出力するExcelファイルの設定
        $writer = new Xlsx($spreadsheet);

        // メモリバッファに書き出し
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return $content;
    }

    private function setRowValue(Attendances $attendances,Camp $camp, int $index)
    {
        $rowIndex = $index + 5;

        $this->activeSheet->setCellValue('B' . $rowIndex, $attendances->getUser()->getLastName());
        $this->activeSheet->setCellValue('C' . $rowIndex, $attendances->getUser()->getFirstName());
        $this->activeSheet->setCellValue('D' . $rowIndex, $attendances->getUser()->getUniversity()?->getName() ?? "");
        $this->activeSheet->setCellValue('E' . $rowIndex, $attendances->getUser()->getGrade());
        $this->activeSheet->setCellValue('F' . $rowIndex, $attendances->getUser()->getRoles()->toString());

        $this->setAttendanceValue($attendances, $camp, $index);
        
        $this->activeSheet->setCellValue('Z' . $rowIndex, $attendances->getUser()->getLicenceDeadline()->format('Y/m/d'));
    }

    private function setAttendanceValue(Attendances $attendances, Camp $camp, int $index)
    {
        $rowIndex = $index + 5;

        $attendanceArray = $attendances->mergeCampAttendances($camp->getStartDate(), $camp->getEndDate());

        $startDate = $camp->getStartDate();

        foreach ($attendanceArray as $date => $attendance) {
            // 列を計算（H列からスタート）
            $columnIndex = 'H';
            $daysDiff = Carbon::createFromFormat('Y-m-d', $date)->diffInDays($startDate);

            for ($i = 0; $i < $daysDiff; $i++) {
                $columnIndex++;
            }

            // 出席データをセット
            $this->activeSheet->setCellValue($columnIndex . $rowIndex, $attendance);
        }
    }
}
