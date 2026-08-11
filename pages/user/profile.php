<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/12ec0fec7b.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet">
    <link href="/css/output.css" rel="stylesheet">
    <title>Profile</title>
</head>
<body class="w-full h-screen flex relative overflow-hidden">
    
    <?php include __DIR__ . '/../../components/sidebar.php'; ?>

    <main class="flex-auto bg-white h-full w-0 py-12 md:p-6 overflow-auto">
        <header class="main-header flex items-center justify-center mb-6 w-full">
            <span class="text-4xl font-semibold">User Profile</span>
        </header>
        <div class="profile-cards flex flex-col gap-3 w-full min-w-70 max-w-4xl mx-auto mb-6">
            <section class="flex items-center gap-3 px-3 py-4 md:gap-24 justify-center rounded-lg shadow-md shadow-blue-500/50">
                <div class="left flex justify-center ">
                    <img class="h-18 w-18 md:h-28 md:w-28 rounded-[100%]" src="/assets/images/2x2-photo-me.jpeg" alt="">
                </div>
                <div class="flex flex-col gap-2">
                    <button class="bg-yellow-400 flex items-center gap-1 py-1 px-2 rounded-md">
                        <i class="fa-solid fa-image"></i>
                        <span>Change Photo</span>
                    </button>
                    <button class="bg-yellow-400 flex items-center gap-1 py-1 px-2 rounded-md">
                        <i class="fa-solid fa-trash-can"></i>
                        <span>Remove Photo</span>
                    </button>
                </div>
            </section>
            <section id="editInfo" class="py-4 px-4 rounded-lg shadow-md shadow-blue-500/50">
                <header class="main-header flex items-center justify-between w-full mb-3">
                    <span class="text-xl md:text-2xl font-medium">Personal Information</span>
                    <button id="editPersonal"><i id="editIcon" class="fa-solid fa-pen-to-square"></i></button>
                </header>
                <div class="newInfoNotice flex justify-center w-full">
                    <span class="text-center w-full ease-in duration-100 wrap-break-word rounded-lg" id="newInfoNotice"></span>
                </div>
                <fieldset class="flex flex-col md:grid md:grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="">First Name</label>
                        <input class="bg-gray-200 rounded-md" type="text" id="editFirstName" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Last Name</label>
                        <input class="bg-gray-200 rounded-md" type="text" id="editLastName" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Email Address</label>
                        <input class="bg-gray-200 rounded-md" type="email" id="editEmail" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Contact No.</label>
                        <input class="bg-gray-200 rounded-md" type="number" id="editContactNo" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Birth Date</label>
                        <input class="bg-gray-200 rounded-md pl-3" type="date" id="editBirthdate" readonly>
                    </div>
                </fieldset>
            </section>
            <section class="py-4 px-4 rounded-lg shadow-md shadow-blue-500/50">
                <header class="main-header flex items-center justify-start w-full mb-3">
                    <span class="text-xl md:text-2xl font-medium">Security & Preferences</span>
                </header>
                <div class="grid grid-cols-2 md:flex gap-2">
                    <div class="flex flex-col md:w-1/2">
                        <label for="">Theme</label>
                        <select name="" id="" class="bg-gray-200 rounded-md pl-3">
                            <option value="system">System</option>
                            <option value="system">Dark</option>
                            <option value="system">Light</option>
                        </select>
                    </div>
                    <div class="flex flex-col md:w-1/2">
                        <label for="">Language</label>
                        <select name="" id="" class="bg-gray-200 rounded-md pl-3">
                            <option value="system">English</option>
                            <option value="system">Filipino</option>
                            <option value="system">Russian</option>
                        </select>
                    </div>
                </div>
                <div id="newPassNotice" class="newPassNotice flex justify-center w-full my-3">
                    <span class="text-center w-full ease-in duration-100 wrap-break-word rounded-lg" id="newPassNotice"></span>
                </div>
                <div class="flex flex-col my-3 md:flex md:flex-row gap-2">
                    <div class="flex flex-col md:w-1/2">
                        <label for="">Current Password</label>
                        <input id="currentPassword" class="bg-gray-200 rounded-md pl-3" type="password" placeholder="Enter current password" readonly>
                    </div>
                    <div class="flex flex-col md:w-1/2">
                        <label for="">New Password</label>
                        <input id="newPassword" class="bg-gray-200 rounded-md pl-3" type="password" placeholder="Enter new password" readonly>
                    </div>
                    <div class="flex flex-col md:w-1/2">
                        <label for="">Confirm New Password</label>
                        <input id="confirmNewPassword" class="bg-gray-200 rounded-md pl-3" type="password" placeholder="Confirm new password" readonly>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button id="updatePassBtn" class="bg-yellow-400 shadow-md shadow-blue-500/50 px-3 rounded-md">Update Password</button>
                </div>
            </section>
        </div>
    </main>

    <aside class="hidden w-1/4 p-6 flex-col h-full md:flex md:items-stretch bg-yellow-400">
        <div class="sidebar-header flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full">
                <span id="menu" class="sidebar-text text-2xl font-semibold">Profile summary</span>
            </div>
            <div class="text-center my-8">
                <i class="fa-solid fa-circle-user text-9xl"></i>
            </div>
        </div>
        <div class="account-stats bg-white p-4 rounded-lg shadow-md shadow-blue-500/50">
            <header class="main-header flex items-center justify-start w-full mb-3">
                <span class="text-xl font-medium">Account stats</span>
            </header>
            <div class="stat-cards flex flex-col gap-2">
                <div class="stat-item p-2 rounded-md shadow-md shadow-blue-500/50">
                    <span>Tasks Completed: <span class="font-medium">103</span></span>
                </div>
                <div class="stat-item p-2 rounded-md shadow-md shadow-blue-500/50">
                    <span>Lists created: <span class="font-medium">103</span></span>
                </div>
                <div class="stat-item p-2 rounded-md shadow-md shadow-blue-500/50">
                    <span>Account age: <span class="font-medium">103</span></span>
                </div>
            </div>
        </div>
    </aside>

    <script src="/scripts/main.js" type="module"></script>
</body>
</html>