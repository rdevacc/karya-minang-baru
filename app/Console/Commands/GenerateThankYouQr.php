<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\File;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class GenerateThankYouQr extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-thank-you-qr';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $svg = QrCode::format('svg')->size(250)->generate(url('/thank-you'));

        File::put(public_path('assets/thank-you-qr.svg'),$svg);

        $this->info('QR berhasil dibuat.');

        return self::SUCCESS;
    }
}
