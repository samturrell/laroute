<?php

namespace SamTurrell\Laroute;

use Lord\Laroute\LarouteServiceProvider;
use Lord\Laroute\Console\Commands\LarouteGeneratorCommand;
use SamTurrell\Laroute\Routes\Collection as Routes;

class ServiceProvider extends LarouteServiceProvider
{
    /**
     * Register the command.
     *
     * @return void
     */
    protected function registerCommand()
    {
        $this->app->singleton('command.laroute.generate', function($app) {
            $config     = $app['config'];
            $routes     = new Routes($app['router']->getRoutes(), $config->get('laroute.filter', 'all'), $config->get('laroute.action_namespace', ''));
            $generator  = $app->make('Lord\Laroute\Generators\GeneratorInterface');

            return new LarouteGeneratorCommand($config, $routes, $generator);
        });

        $this->commands('command.laroute.generate');
    }

    /**
     * Get the config path
     *
     * @return string
     */
    protected function getConfigPath()
    {
        return realpath(__DIR__.'/../config/laroute.php');
    }
}
