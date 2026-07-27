<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_portfolio_homepage_renders_successfully(): void
    {
        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertSee('INES AOUADHI')
            ->assertSee('The Cut')
            ->assertSee('Casting view')
            ->assertDontSee('Booking email to be added');
    }
}