<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    public function index(): View
    {
        $directory = public_path('images/ines/originals');
        $files = File::isDirectory($directory) ? File::files($directory) : [];

        usort($files, fn ($left, $right) => strnatcasecmp($left->getFilename(), $right->getFilename()));

        $powerNames = [
            'WhatsApp Image 2026-07-27 at 23.41.07 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.07.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (2).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (3).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09.jpeg',
        ];

        $softNames = [
            'WhatsApp Image 2026-07-27 at 23.41.09 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (2).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (3).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (5).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (2).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (3).jpeg',
        ];

        $lifestyleNames = [
            'WhatsApp Image 2026-07-27 at 23.41.10 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (5).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (6).jpeg',
        ];

        $photos = collect($files)
            ->map(function ($file, int $index) use ($powerNames, $softNames, $lifestyleNames) {
                $filename = $file->getFilename();
                $chapter = match (true) {
                    in_array($filename, $powerNames, true) => 'power',
                    in_array($filename, $softNames, true) => 'soft',
                    in_array($filename, $lifestyleNames, true) => 'lifestyle',
                    default => 'archive',
                };

                return [
                    'id' => sprintf('ines-%02d', $index + 1),
                    'filename' => $filename,
                    'path' => 'images/ines/originals/'.$filename,
                    'chapter' => $chapter,
                    'alt' => "Ines Aouadhi — {$chapter} editorial portrait",
                ];
            });

        $find = fn (string $filename) => $photos->firstWhere('filename', $filename);
        $takeExisting = fn (array $names) => collect($names)->map($find)->filter()->values();

        $hero = $find('WhatsApp Image 2026-07-27 at 23.41.09 (5).jpeg') ?? $photos->first();

        $face = $takeExisting([
            'WhatsApp Image 2026-07-27 at 23.41.09 (5).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.07 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (3).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (2).jpeg',
        ]);

        $soft = $takeExisting([
            'WhatsApp Image 2026-07-27 at 23.41.09 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (3).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09 (5).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (3).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (2).jpeg',
        ]);

        $power = $takeExisting([
            'WhatsApp Image 2026-07-27 at 23.41.07 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.07.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (2).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.08.jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.09.jpeg',
        ]);

        $lifestyle = $takeExisting([
            'WhatsApp Image 2026-07-27 at 23.41.10 (4).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (5).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (6).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (1).jpeg',
            'WhatsApp Image 2026-07-27 at 23.41.10 (2).jpeg',
        ]);

        return view('portfolio.index', [
            'portfolio' => config('portfolio'),
            'photos' => $photos,
            'hero' => $hero,
            'facePhotos' => $face,
            'softPhotos' => $soft,
            'powerPhotos' => $power,
            'lifestylePhotos' => $lifestyle,
        ]);
    }
}
