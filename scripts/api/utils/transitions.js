export function toggleSidebar() {
    const sidebar = document.getElementById("collapsableSidebar");
    const sidebarHeader = document.querySelector(".sidebar-header");
    const hamburger = document.getElementById("hamburger");
    const card = document.querySelector(".card");

    if (!sidebar) return;

    let isPinned = false;

    const expandSidebar = () => {
        sidebar.classList.remove("w-16", "items-center");
        sidebar.classList.add("w-64", "items-stretch");

        if (sidebarHeader) {
            sidebarHeader.classList.remove("justify-center");
            sidebarHeader.classList.add("justify-between");
        }

        if(card) {
            card.remove('flex');
            card.classList.add('flex-col');
        }

        const textElements = sidebar.querySelectorAll(".sidebar-text");
        textElements.forEach(el => el.classList.remove("hidden"));

        const iconElements = sidebar.querySelectorAll(".icons");
        iconElements.forEach(el => el.classList.remove("items-center"));

    };

    const collapseSidebar = () => {
        if (isPinned) return;

        sidebar.classList.remove("w-64", "items-stretch");
        sidebar.classList.add("w-16", "items-center");

        if (sidebarHeader) {
            sidebarHeader.classList.remove("justify-between");
            sidebarHeader.classList.add("justify-center");
        }

        const textElements = sidebar.querySelectorAll(".sidebar-text");
        textElements.forEach(el => el.classList.add("hidden"));

        const iconElements = sidebar.querySelectorAll(".icons");
        iconElements.forEach(el => el.classList.add("items-center"));
    };

    // Expand / collapse
    sidebar.addEventListener("mouseenter", expandSidebar);
    sidebar.addEventListener("mouseleave", collapseSidebar);

    // Pin state
    if (hamburger) {
        hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            isPinned = !isPinned;

            if (isPinned) {
                expandSidebar();
            } else {
                collapseSidebar();
            }
        });
    }

    collapseSidebar();
}