<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/12ec0fec7b.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet">
    <link href="./css/output.css" rel="stylesheet">
    <title>TickedList</title>
</head>
<body class="w-full h-screen flex relative overflow-hidden">
    
    <?php include __DIR__ . '/components/sidebar.php'; ?>

    <main class="flex-auto bg-white h-full w-0 py-6 px-6 md:p-6 overflow-y-scroll">
        <header class="main-header flex items-center flex-col w-full my-6 md:flex-row md:gap-3">
            <span id="greeting" class="text-4xl font-semibold"></span>
            <q id="quote" class="italic wrap-break-word text-center bg-blue text-blue-950/50"></q>
        </header>
        <section id="addBox" class="add-box rounded bg-yellow-400 hover:bg-yellow-400/70 active:bg-amber-400 mb-6 py-1 px-3 w-36 md:w-1/5 text-center shadow-md shadow-blue-500/50 transition">
            <i class="fa-solid fa-square-plus"></i>
            <button class="cursor-pointer">Add Task</button>
        </section>
        <div class="filter-container flex flex-col md:flex-row mb-3 gap-3 w-full text-sm">
            <div class="filter-item flex flex-col gap-1 flex-1 min-w-0">
                <div>
                    <i class="fa-solid fa-bars-progress"></i>
                    <span>Status</span>
                </div>
                <div>
                    <select name="" id="statusSelect" class="py-1 px-2 rounded-md w-full max-w-full">
                        <option value="All">Show All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <div class="filter-item flex flex-col gap-1 flex-1 min-w-0">
                <div>
                    <i class="fa-solid fa-rectangle-list"></i>
                    <span>List Type</span>
                </div>
                <div>
                    <select name="" id="listTypeSelect" class="py-1 px-2 rounded-md w-full max-w-full">
                        <option value="All">All</option>
                        <option value="Personal">Personal</option>
                        <option value="Errand">Errand</option>
                        <option value="Commission">Commission</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Educational">Educational</option>
                        <option value="Work">Work</option>
                    </select>
                </div>
            </div>
            <div class="filter-item flex flex-col gap-1 flex-1 min-w-0">
                <div>
                    <i class="fa-solid fa-calendar-days"></i>
                    <span>Date</span>
                </div>
                <div>
                    <select name="" id="dateSelect" class="py-1 px-2 rounded-md w-full max-w-full">
                        <option value="recent">Recently Added</option>
                        <option value="latest">Date (Descending)</option>
                        <option value="oldest">Date (Ascending)</option>
                    </select>
                </div>
            </div>
        </div>
        <span class="font-medium">YOUR TASKS</span>
        <section class="tasks-container flex flex-col gap-2 mt-2">
            <!-- Tasks will be shown here -->
            <div class="info flex justify-center font-extrabold text-center text-2xl mb:text-3xl text-blue-950/50 ">
                <span id="info"></span>
            </div>
        </section>
    </main>

    <aside class="hidden w-1/4 p-6 flex-col md:flex md:items-stretch bg-yellow-400">
        <div class="task-detail-header text-2xl font-semibold">
            <span>Task Details</span>
            <i class="fa-solid fa-circle-info"></i>
        </div>
        <div class="flex justify-center mt-2">
            <span id="taskStatus" class="text-center"></span>
        </div>
        <div class="flex justify-center wrap-break-word m-6">
            <input id="editTitle" type="text" class="font-extrabold text-center text-2xl px-2 rounded-lg" value="No task selected." readonly>
        </div>
        <span class="text-lg">Task Description:</span>
        <div class="flex flex-col gap-3">
            <textarea 
                id="editDescription" 
                placeholder="Update a description..." 
                readonly
                rows="5"
                class="w-full text-sm text-gray-700 p-3 bg-white rounded-md focus:outline-none resize-none">
            </textarea>
            <div class="flex justify-around gap-1">
                <div>
                    <span>Due Date:</span>
                    <div class="pill flex items-center text-xs font-medium cursor-pointer transition">
                        <input type="date" id="editDueDate" class="bg-white px-4 py-1 rounded-md" readonly>
                    </div>
                </div>
                <div>
                    <span>List Type:</span>
                    <div class="flex flex-col items-center">
                        <select name="" id="editListType" class="bg-white text-xs font-medium px-4 py-1 rounded-md" disabled>
                            <option value="Personal">Personal</option>
                            <option value="Errand">Errand</option>
                            <option value="Commission">Commission</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Educational">Educational</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <i class="fa-solid fa-tags"></i>
                <span class="text-lg">Tags:</span>
            </div>
            <div class="tags-container bg-white px-3 py-1 w-1/2 text-center rounded-md font-medium cursor-pointer">
                <i class="fa-solid fa-plus"></i>
                <span class="">Add Tags</span>
            </div>
            <div class="flex items-center gap-1">
                <i class="fa-solid fa-diagram-successor"></i>
                <span class="text-lg">Subtask:</span>
            </div>
            <div class="tags-container bg-white px-3 py-1 w-1/2 text-center rounded-md font-medium cursor-pointer">
                <i class="fa-solid fa-plus"></i>
                <span class="">Add Subtask</span>
            </div>
        </div>
        <div class="task-detail-footer flex justify-center items-center gap-3 mt-auto">
            <button id="deleteBtn" class="px-4 py-1 bg-red-500 hover:bg-red-500/70 active:bg-red-500 text-white cursor-pointer font-medium rounded-lg transition">Delete</button>
            <button id="editBtn" class="bg-white px-4 py-1 hover:bg-yellow-300 active:bg-white font-medium cursor-pointer rounded-lg transition">Edit</button>
        </div>
    </aside>

    <!-- Modal Overlay Container -->
    <div id="taskModal" class="fixed hidden inset-0 bg-black/50 items-center justify-center z-10">
        <!-- Modal Card -->
        <div class="modal bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 relative">
            <i id="close" class="fa-solid fa-xmark absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-xl"></i>
            <form action="" id="taskForm">
                <fieldset class="flex flex-col p-6 gap-3">
                    <input
                    id="title"
                    type="text"
                    placeholder="Task title..."
                    class="w-full text-lg font-semibold border-b border-gray-200 pb-2 focus:outline-none focus:border-amber-400"
                    />
                    <textarea 
                    id="description" 
                    placeholder="Write a description..." 
                    rows="3" 
                    class="w-full text-sm text-gray-700 focus:outline-none resize-none"
                    ></textarea>
                </fieldset>
                <div class="notice flex justify-center w-full px-6">
                    <span class="text-center z-20 w-full wrap-break-word bg-red-600/50 text-white rounded-sm" id="notice"></span>
                </div>
                <div class="pill-container flex flex-wrap justify-end gap-2 py-3 px-6 bg-gray-50/50 border-t border-gray-100">
                    <div class="pill flex gap-2 items-center rounded-2xl px-3 py-1 bg-yellow-400 text-xs font-medium cursor-pointer hover:bg-yellow-500 transition">
                        <span>Due Date:</span>
                        <input type="date" id="dueDate">
                    </div>
                    <div class="pill flex gap-2 items-center rounded-2xl px-3 py-1 bg-yellow-400 text-xs font-medium cursor-pointer hover:bg-yellow-500 transition">
                        <i class="fa-solid fa-tags"></i>
                        <span>Tags</span>
                    </div>
                    <div class="pill flex gap-2 items-center rounded-2xl px-3 py-1 bg-yellow-400 text-xs font-medium cursor-pointer hover:bg-yellow-500 transition">
                        <i class="fa-solid fa-list"></i>
                        <select name="" id="addListType">
                            <option value="Personal">Personal</option>
                            <option value="Errand">Errand</option>
                            <option value="Commission">Commission</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Educational">Educational</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                </div>
                <div id="createBtn" class="modal-footer py-3 px-6 flex justify-end bg-yellow-400 items-center">
                    <button class="bg-white hover:bg-yellow-400 active:bg-white text-gray-800 font-semibold rounded-md px-5 py-1.5 cursor-pointer shadow-sm transition">Create</button>
                </div> 
            </form>
        </div>
    </div>
    
    <div id="taskDetailsModal" class="fixed inset-0 bg-black/50 hidden md:hidden items-center justify-center p-6 z-10">
        <div class="modal bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md relative">
            <div class="task-detail-header text-2xl font-semibold">
                <span>Task Details</span>
                <i class="fa-solid fa-circle-info"></i>
            </div>
            <div class="flex justify-center mt-2">
                <span id="taskStatusMobile" class="text-center"></span>
            </div>
            <div class="flex justify-center wrap-break-word m-6">
                <input id="editTitleMobile" type="text" class="font-extrabold text-center text-2xl px-2 rounded-lg" value="No task selected." readonly>
            </div>
            <span class="text-lg">Task Description:</span>
            <div class="flex flex-col gap-3">
                <textarea 
                    id="editDescriptionMobile" 
                    placeholder="Update a description..." 
                    readonly
                    rows="5"
                    class="w-full text-sm text-gray-700 p-3 bg-white rounded-md focus:outline-none resize-none">
                </textarea>
                <div class="flex justify-around gap-1">
                    <div>
                        <span>Due Date:</span>
                        <div class="pill flex items-center text-xs font-medium cursor-pointer transition">
                            <input type="date" id="editDueDateMobile" class="bg-white px-4 py-1 rounded-md" readonly>
                        </div>
                    </div>
                    <div>
                        <span>List Type:</span>
                        <div class="flex flex-col items-center">
                            <select name="" id="editListTypeMobile" class="bg-white text-xs font-medium px-4 py-1 rounded-md" disabled>
                                <option value="Personal">Personal</option>
                                <option value="Errand">Errand</option>
                                <option value="Commission">Commission</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Educational">Educational</option>
                                <option value="Work">Work</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-tags"></i>
                    <span class="text-lg">Tags:</span>
                </div>
                <div class="tags-container bg-white px-3 py-1 w-1/2 text-center rounded-md font-medium cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                    <span class="">Add Tags</span>
                </div>
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-diagram-successor"></i>
                    <span class="text-lg">Subtask:</span>
                </div>
                <div class="tags-container bg-white px-3 py-1 w-1/2 text-center rounded-md font-medium cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                    <span class="">Add Subtask</span>
                </div>
            </div>
            <div class="task-detail-footer flex justify-center items-center gap-3 mt-auto">
                <button id="deleteBtnMobile" class="px-4 py-1 bg-red-500 hover:bg-red-500/70 active:bg-red-500 text-white cursor-pointer font-medium rounded-lg transition">Delete</button>
                <button id="editBtnMobile" class="bg-white px-4 py-1 hover:bg-yellow-300 active:bg-white font-medium cursor-pointer rounded-lg transition">Edit</button>
            </div>
        </div>
    </div>
   
    
    <div id="confirmModal" class="fixed hidden inset-0 bg-black/50 items-center justify-center z-10">
        <div class="modal flex flex-col gap-3 items-center justify-center bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 p-4 relative">
            <div>
                <span id="confirmMessage">Do you want to delete?</span>
            </div>
            <div class="modal-footer">
                <button id="confirmCancel" class="px-4 py-1 cursor-pointer hover:shadow-md hover:shadow-blue-500/50 font-medium rounded-lg transition">Cancel</button>
                <button id="confirmDelete" class="px-4 py-1 bg-red-500 hover:bg-red-500/70 active:bg-red-500 text-white cursor-pointer font-medium rounded-lg">Delete</button>
            </div>
        </div>
    </div>
    
     <script src="/scripts/main.js" type="module"></script>
</body>
</html>