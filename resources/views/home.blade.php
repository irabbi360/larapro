@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @if (Auth::user()->role === 1)
       <left-sidebar></left-sidebar>
        @endif

        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                        @if (Auth::user()->role === 1)
                            {{ Auth::user()->name }} <br>
                            {{ Auth::user()->mail }}
                            @else
                            Access
                            Access Deny
                        @endif
                </div>
            </div>
        </div>

        <div class="col-md-2">
            <div class="card">
                <div class="card-header">Right Sidebar</div>
                <div class="card-body">
                    Hello Admin
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
