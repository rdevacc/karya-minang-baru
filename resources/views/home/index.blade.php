@extends('layouts.app')

@section('title', 'Beranda')

@section('content')

    @include('home.hero')

    @include('home.about')

    @include('home.menu')

    @include('home.testimonial')

    @include('home.contact')

@endsection