<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Infrastructure\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'grade' => request('grade'),
            'license_deadline' => request('license_deadline'),
            'birthday' => request('birthday'),
        ]);

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'token' => $token
        ], 201);
    }

    public function update(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();

        if ($request->has('first_name')) {
            $user->name = $request->first_name;
        }

        if ($request->has('last_name')) {
            $user->name = $request->last_name;
        }

        if ($request->has('grade')) {
            $user->grade = $request->grade;
        }

        if ($request->has('license_deadline')) {
            $user->license_deadline = $request->license_deadline;
        }

        if ($request->has('birthday')) {
            $user->birthday = $request->birthday;
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 201);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $token = $user->createToken('API Token')->plainTextToken;
            return response()->json([
                'token' => $token
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json('Logged out', 200);
    }
}
