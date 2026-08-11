<aside id="collapsableSidebar" class="flex flex-col h-full flex-none transition-all duration-300 ease-in-out w-16 py-6 px-3 bg-yellow-400 md:bg-white border-r-4 items-center overflow-hidden">
    <div class="sidebar-header flex justify-center items-center w-full">
        <span id="menu" class="sidebar-text hidden text-2xl ml-3 font-semibold">Menu</span>
        <i id="hamburger" class="fa-solid fa-bars text-xl cursor-pointer"></i>
    </div>
    <div id="sidebarItems" class="item-container flex-1 mt-6 overflow-y-auto flex flex-col gap-2 w-full">
        <span class="sidebar-text hidden font-semibold ml-3">TASKS</span>
        <div class="icons tasks flex flex-col items-center gap-2">
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
                <i class="fa-solid fa-house-chimney text-lg"></i>
                <a href="/index.php" class="sidebar-text hidden whitespace-nowrap">Home</a>
            </div>
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
                <i class="fa-solid fa-sun text-lg"></i>
                <a href="" class="sidebar-text hidden whitespace-nowrap">Today</a>
            </div>
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
                <i class="fa-solid fa-note-sticky text-lg"></i>
                <a href="" class="sidebar-text hidden whitespace-nowrap">Sticky Notes</a>
            </div>
        </div>
        <span class="sidebar-text hidden font-semibold ml-3">LISTS</span>
        <div class="icons list flex flex-col items-center gap-2">
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
                <i class="fa-solid fa-rectangle-list text-lg"></i>
                <a href="" class="sidebar-text hidden whitespace-nowrap">Personal</a>
            </div>
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
                <i class="fa-solid fa-rectangle-list text-lg"></i>
                <a href="" class="sidebar-text hidden whitespace-nowrap">Work</a>
            </div>
            <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 duration-200 cursor-pointer">
                <i class="fa-solid fa-plus text-lg"></i>
                <a href="" class="sidebar-text hidden whitespace-nowrap">Add List Type</a>
            </div>
        </div>
        <span class="sidebar-text hidden font-semibold ml-3">TAGS</span>
        <div class="icons tags flex flex-col items-center gap-2">
        </div>
    </div>
    <div id="sidebarFooter" class="icons sidebar-footer items-center mt-auto pt-4 flex flex-col gap-2 w-full">
        <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-yellow-400 hover:ease-in hover:pl-5 duration-200 cursor-pointer">
            <i class="fa-solid fa-circle-user"></i>
            <a href="/pages/user/profile.php" class="sidebar-text hidden whitespace-nowrap">Profile</a>
        </div>
        <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-red-500 hover:text-white hover:ease-in hover:pl-5 duration-200 cursor-pointer" id="logout"">
            <i class="fa-solid fa-right-from-bracket text-lg"></i>
            <a href="" class="sidebar-text hidden whitespace-nowrap">Logout</a>
        </div>
        <div class="item py-2 px-3 rounded-md flex items-center gap-3 active:bg-yellow-400/50 hover:bg-red-500 hover:text-white hover:ease-in hover:pl-5 duration-200 cursor-pointer" id="logout">
            <i class="fa-solid fa-right-from-bracket text-lg"></i>
            <a href="" class="sidebar-text hidden whitespace-nowrap">Logout</a>
        </div>
    </div>
</aside>