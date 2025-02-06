<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class MessageController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index(): JsonResponse
    {
        /** @var Message $user */
        $user = Auth::user();
        $messages = $user->messages;

        return response()->json(['data' => $messages]);
    }

    public function store(): JsonResponse
    {
        $messageDataValidated = request()->validate([
            'user_id' => 'required',
            'contact_id' => 'required|email',
            'type' => 'required',
            'body' => 'required',
            'status' => 'required',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $message = $user->messages()->create($messageDataValidated);

        return response()->json(['data' => $message]);
    }
}
