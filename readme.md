# Laroute

This package extends the original `aaronlord/laroute` package with a more lightweight footprint. It does this by removing route actions and other properties that aren't necessarily required or "safe" to freely expose. This modified functionality is taken from the `axn/laravel-laroute` package with additional functionality and even smaller footprint.

## Installation

Install via Composer:

```sh
composer require samturrell/laroute
```

In Laravel 5.5 the service provider will automatically get registered.
In older versions of the framework just add the service provider
to the array of providers in `config/app.php`:

```php
'providers' => [
    // ...
    SamTurrell\Laroute\ServiceProvider::class,
],
```

## How to use

The readme of the original project ([aaronlord/laroute](https://github.com/aaronlord/laroute)) should provide adequate instructions for use.

The only thing to note is that only the route *name* related methods and data are available.

In addition, there is a new method in the javascript called `currentRoute()` which will return the route you're currently on. This is also available when calling the `route()` method when you don't provide a route name.
