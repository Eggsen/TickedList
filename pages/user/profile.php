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

    <main class="flex-auto bg-white h-full w-0 py-12 px-6 md:p-6 overflow-auto">
        <header class="main-header flex items-center justify-center mb-6 w-full">
            <span class="text-4xl font-semibold">User Profile</span>
        </header>
        <div class="profile-cards flex flex-col gap-3 w-full min-w-70 max-w-4xl mx-auto">
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
            <section class="p-4 rounded-lg shadow-md shadow-blue-500/50">
                <header class="main-header flex items-center justify-between w-full mb-3">
                    <span class="text-2xl font-medium">Personal Information</span>
                    <button type="button" id="editInfo">
                        <i id="editInfoIcon" class="fa-solid fa-pen-to-square cursor-pointer text-lg"></i>
                    </button>
                </header>
                <fieldset id="personalInfo" class="grid grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="">First Name</label>
                        <input class="bg-gray-200 rounded-md px-3" type="text" id="editFirstName" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Last Name</label>
                        <input class="bg-gray-200 rounded-md px-3" type="text" id="editLastName" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Email Address</label>
                        <input class="bg-gray-200 rounded-md px-3" type="email" id="editEmail" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Contact No.</label>
                        <input class="bg-gray-200 rounded-md px-3" type="number" id="editContactNum" readonly>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="">Birth Date</label>
                        <input class="bg-gray-200 rounded-md px-3" type="date" id="editBirthDate" readonly>
                    </div>
                </fieldset>
            </section>
            <section class="py-4 px-4 rounded-lg shadow-md shadow-blue-500/50">
                <header class="main-header flex items-center justify-between w-full mb-3">
                    <span class="text-2xl font-medium">Security & Preferences</span>
                    <div class="notice flex justify-center">
                        <span class="text-center z-20 w-full wrap-break-word text-red-600 rounded-sm" id="notice"></span>
                    </div>
                </header>
                <div class="flex flex-col gap-2">
                    <div class="password-change flex gap-1 items-center">
                        <div class="flex flex-col md:w-1/2">
                            <label for="">Current Password</label>
                            <input type="password" class="bg-gray-200 rounded-md px-3" placeholder="Enter current password" id="enterCurrentPassword" readonly>
                        </div>
                        <div class="flex flex-col md:w-1/2">
                            <label for="">New Password</label>
                            <input type="password" class="bg-gray-200 rounded-md px-3" placeholder="Enter new password" id="enterNewPassword" readonly>
                        </div>
                        <div class="flex flex-col md:w-1/2">
                            <button id="updatePassBtn" class="rounded-md px-3 shadow-md shadow-blue-500/50 hover:bg-yellow-400 transition active:bg-yellow-400/50">Update Password</button>
                        </div>
                    </div>
                    <div class="preferences flex gap-1">
                        <div class="flex flex-col md:w-1/2">
                            <label for="">Theme</label>
                            <select name="" id="" class="bg-gray-200 rounded-md px-3">
                                <option value="system">System</option>
                                <option value="system">Dark</option>
                                <option value="system">Light</option>
                            </select>
                        </div>
                        <div class="flex flex-col md:w-1/2">
                            <label for="">Language</label>
                            <select name="" id="" class="bg-gray-200 rounded-md px-3">
                                <option value="system">English</option>
                                <option value="system">Filipino</option>
                                <option value="system">Russian</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <aside class="hidden w-1/4 p-6 flex-col h-full md:flex md:items-stretch bg-yellow-400">
        <div class="sidebar-header flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-full">
                <span id="menu" class="sidebar-text text-2xl ml-3 font-semibold">Profile summary</span>
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