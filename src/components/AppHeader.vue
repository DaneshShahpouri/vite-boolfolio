<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<template>
    <nav>

        <div class="navbar nav-inner">

            <div class="logo-wrapper">
                <h3>DS</h3>
            </div>

            <ul class="links">
                <li class="link">
                    <router-link :to="{ name: 'home' }">Home</router-link>
                </li>
                <li class="link">
                    <router-link :to="{ name: 'projects' }">Projects</router-link>
                </li>
                <li class="link">
                    <router-link :to="{ name: 'about' }">About</router-link>
                </li>
            </ul>
        </div>

    </nav>
</template>

<style  lang="scss" scoped>
@mixin my-display-flex($justifyContent) {
    display: flex;
    flex-direction: row;
    justify-content: $justifyContent;
    align-items: center;
}

nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    max-width: 1200px;
    height: 50px;
    margin: 0 auto;

    background: rgba(255, 255, 255, 0);
    padding: 0 1em;


    .nav-inner {
        @include my-display-flex(space-between);

        width: 100%;
        max-width: 1200px;
        height: 100%;

        .logo-wrapper {
            width: 60px;
            height: 60px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .links {
            @include my-display-flex(flex-start);
            gap: 10px;
            height: 100%;

            li {
                display: flex;
                align-items: center;
                list-style-type: none;
                height: 100%;
                border-bottom: 4px solid rgba(0, 0, 255, 0);
                color: black;

                &:hover {
                    color: rgb(2, 130, 249)
                }

                a {
                    color: inherit;
                    text-decoration: none;
                    text-transform: uppercase;
                }
            }
        }
    }

}
</style>
