<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar w/ text</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" active-class="active" class="nav-link">首页</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" active-class="active" class="nav-link">土尔音乐</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" active-class="active" class="nav-link">建材主站</router-link>
                    </li>
                </ul>
                <span class="navbar-text">
                    Navbar text with an inline element
                </span>
            </div>
        </div>
    </nav>
</template>