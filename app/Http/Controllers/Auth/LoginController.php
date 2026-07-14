<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;


class LoginController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store(LoginRequest $request)
    {
        $request->ensureIsNotRateLimited();

        $credentials = $request->only(
            'email',
            'password'
        );

        $remember = $request->boolean(
            'remember'
        );

        if (! Auth::attempt(
            $credentials,
            $remember
        )) {

            RateLimiter::hit(
                $request->throttleKey()
            );

            return back()

                ->withErrors([
                    'email' => 'Email atau password salah.',
                ])

                ->onlyInput('email');

        }

        RateLimiter::clear(
            $request->throttleKey()
        );

        $request->session()->regenerate();

        return redirect()->route(
            'admin.dashboard'
        );
    }    

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}