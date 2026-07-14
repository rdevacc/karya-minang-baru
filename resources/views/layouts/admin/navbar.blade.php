<nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm">

    <div class="container-fluid">

        <div>

            <h5 class="mb-0 fw-bold">

                @yield('title')

            </h5>

            <small class="text-muted">

                Rumah Makan Padang Karya Minang Baru

            </small>

        </div>

        <div class="ms-auto">

            <div class="dropdown">

                <button
                    class="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown">

                    <i class="fas fa-user-circle me-2"></i>

                    Admin

                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>

                        <a
                            class="dropdown-item"
                            href="#">

                            Profil

                        </a>

                    </li>

                    <li>

                        <hr class="dropdown-divider">

                    </li>

                    <li>

                        <a
                            class="dropdown-item text-danger"
                            href="#">

                            Logout

                        </a>

                    </li>

                </ul>

            </div>

        </div>

    </div>

</nav>