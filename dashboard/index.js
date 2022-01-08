// dashboard js

(function () {

    let swapView = (container0, container1) => {
        document.getElementById(container0).style = "display: none;";
        document.getElementById(container1).style = "display: block;";
    }


    // view home of dashboard
    var HomeButton = document.getElementById('home');
    if (HomeButton) {
        HomeButton.addEventListener('click', function () {
            document.getElementById('ViewClassPage').style = "display: none";
            document.getElementById('AddClassForm').style = "display: none";
        });
    }

    // view attendance
    var Attendance = document.getElementById('attendance');
    if (Attendance) {
        Attendance.addEventListener('click', function () {
            var ClassAttendance = document.getElementById('attendance-class').value;
            var ClassType = document.getElementById('classType').value;
            alert("This is a " + ClassType);
        });
    }
    
    // function to switch to add-new-class form
    var AddClassPage = document.getElementById('addclass');
    if (AddClassPage) {
        AddClassPage.addEventListener('click', function () {
            swapView('DashHome', 'AddClassForm');
        });
    }


    // function to views all classes for the user
    var ViewClassPage = document.getElementById('viewclass');
    if (ViewClassPage) {
        ViewClassPage.addEventListener('click', function () {
            swapView('DashHome', 'ViewClassPage');
            $.ajax({
                url: 'index.php',
                method: 'POST', 
                data: {DisplayClasses: 'DisplayClass'}
            });
        });
    }

    // function adds a class
    var AddClassButton = document.getElementById('addclassbutton');
    if (AddClassButton) {
        AddClassButton.addEventListener('click', function () {
            var ClassName = document.getElementById('addclassname').value;
            
            if (ClassName != '') {
                $.ajax({
                    url: '../controllers/DashBoard.php',
                    method: 'POST',
                    data: {classname: ClassName},
                    complete: function (feedback) {
                        if (feedback.responseText === 'class_added') {
                            alert('Class Added!');
                        }

                        if (feedback.responseText === 'add_class_error') {
                            alert('Class Error! Class may already exist.');
                        }

                        if (feedback.responseText === 'class_exists') {
                            alert('Class Already Exist!');
                        }

                        //alert(feedback.responseText);
                    }
                });
            } else {
                alert('Provide Class Name!');
            }
        });
    }

    // switches to add-class-form
    var ClassAdd = document.getElementById('classadd');
    if (ClassAdd) {
        ClassAdd.addEventListener('click', function () {
            swapView('ViewClassPage', 'AddClassForm')
        });
    }


    // delete-class-in-form
    var DeleteClass = document.getElementById('deleteclass');
    if (DeleteClass) {
        DeleteClass.addEventListener('click', function () {
            alert('Class_Deleted');
        });
    }

    // delete class button
    var ConfirmDeleteClass = document.getElementById('proceedclassremov');
    if (ConfirmDeleteClass) {
        ConfirmDeleteClass.addEventListener('click', function () {
            var classtoremove = document.getElementById('class2delete').value;
            var classname0 = document.getElementById('class2rem').value;
            $.ajax({
                url: '../models/ClassTransactions.php',
                method: 'POST',
                data: {
                    ClasstoDelete: classtoremove,
                    ClassName: classname0
                },
                complete: function (feed) {
                    if (feed.responseText === 'class_removed') {
                        alert(classname0 + ' removed!');
                    }

                    //alert(feed.responseText);
                    window.location.href = '../dashboard';
                }
            });
        });
    }

    // cancel class delete button
    var CancelDeleteClass = document.getElementById('cancelclassremove');
    if (CancelDeleteClass) {
        CancelDeleteClass.addEventListener('click', function () {
            window.location.href = "../dashboard";
        });
    }

    // views add-member-to-class form
    var AddClassMembers = document.getElementById('addmember');
    if (AddClassMembers) {
        AddClassMembers.addEventListener('click', function () {
            swapView('ViewClassContents', 'AddClassMembers');
            document.getElementById('ViewSharedClassContents').style = "display: none;";
            //alert('Member added');
        })
    }

    // adds member to a class
    var AddMember = document.getElementById('addmemberbutton');
    if (AddMember) {
        AddMember.addEventListener('click', function () {
            var MemberAddClass = document.getElementById('memberaddclass').value;
            var StudentName = document.getElementById('addstudentname').value;
            var StudentId = document.getElementById('addstudentid').value;
            
            if (StudentId != '') {
                if (StudentId.length == 9) {
                    if (StudentName != '') {
                        $.ajax({
                            url: '../models/ClassTransactions.php',
                            method: 'POST',
                            data: {
                                classforadd: MemberAddClass,
                                personforadd: StudentName,
                                personidforadd: StudentId
                            },
                            complete: function (feed) {
                                if (feed.responseText === 'member_added') {
                                    alert(StudentName + ' successfuly added');
                                }
            
                                if (feed.responseText === 'member_exists') {
                                    alert('Member with ID ' + StudentId + ', is already a member');
                                }

                                //alert(feed.responseText);
                            }
                        });
                    } else { alert('Provide Student Name!'); }
                } else { alert('Student ID should be 9!'); }
            } else { alert('Provide Student ID!'); }
        });
    }

    // update class member information
    var UpdateMember = document.getElementById('update');
    if (UpdateMember) {
        UpdateMember.addEventListener('click', function () {
            var MemberUpdateClass = document.getElementById('memberupdateclass').value;
            var UpdateName = document.getElementById('updatestudentname').value;
            var UpdateID = document.getElementById('updatestudentid').value;
            var BackupName = document.getElementById('backupname').value;
            var BackupID = document.getElementById('backupid').value;
            var sn = document.getElementById('sntoupdate').value;
            
            if (UpdateID != '') {
                if (UpdateID.length == 9) {
                    if (UpdateName != '') {
                        if (BackupID == UpdateID && BackupName == UpdateName) {
                            alert('No Changes detected!');
                        } else {
                            $.ajax({
                                url: '../models/ClassTransactions.php',
                                method: 'POST',
                                data: {
                                    classforupdate: MemberUpdateClass,
                                    personforupdate: UpdateName,
                                    personidforupdate: UpdateID,
                                    recordtoupdate: sn
                                },
                                complete: function (feed) {
                                    if (feed.responseText === 'member_updated') {
                                        alert('Member successfuly updated');
                                    }
    
                                    //alert(feed.responseText);
                                }
                            });
                        }
                    } else { alert('Provide Student Name!'); }
                } else { alert('Student ID should be 9!'); }
            } else { alert('Provide Student ID!'); }
        });
    }

    // remove member from class
    var RemoveMember = document.getElementById('proceedmemremov');
    if (RemoveMember) {
        RemoveMember.addEventListener('click', function () {
            var RecordToRemove = document.getElementById('recordtoremove').value;
            var ClassForRecord = document.getElementById('class2delete').value;
            $.ajax({
                url: '../models/ClassTransactions.php',
                method: 'POST',
                data: {
                    recordtoremove: RecordToRemove,
                    class4remove: ClassForRecord,
                },
                complete: function (feed) {
                    if (feed.responseText == 'member_removed') {
                        alert('Member Removed');
                        window.location.href = '../dashboard';
                    }

                    //alert(feed.responseText);
                }
            });
        });
    }

    // views user's shared classes
    var SharedClass = document.getElementById('shared-class');
    if (SharedClass) {
        SharedClass.addEventListener('click', function () {
            swapView('DashHome', 'SharedClasses');
        });
    }

    // view share-a-class div
    var ShareAClass = document.getElementById('shareaclass');
    if (ShareAClass) {
        ShareAClass.addEventListener('click', function () {
            swapView('SharedClasses', 'ShareAClass');
        });
    }

    // proceed with unsharing of class
    var UnshareClass = document.getElementById('proceedunshare');
    if (UnshareClass) {
        UnshareClass.addEventListener('click', function () {
            var Class2Unshare = document.getElementById('classtounshare').value;
            $.ajax ({
                url: '../models/ClassTransactions.php',
                method: 'POST',
                data: {classunshare: Class2Unshare},
                complete: function (feed) {
                    if (feed.responseText == 'class_unshared') {
                        alert('Class Unsheared');
                        window.location.href = '../dashboard';
                    }
                }
            });
        });
    }

    // proceed to sharing of class
    var ProceedShare = document.getElementById('proceedshareclass');
    if (ProceedShare) {
        ProceedShare.addEventListener('click', function () {
            var ShareTo = document.getElementById('shareclass1').value;
            var ToShare = document.getElementById('classshare').value;
            var ShareBy = document.getElementById('shareby').value;

            if (ShareTo == ShareBy) {
                alert('You can\'t share this class to yourself');
            } else {
                $.ajax ({
                    url: '../models/ClassTransactions.php',
                    method: 'POST',
                    data: {
                        share2: ShareTo,
                        share22: ToShare
                    },
                    complete: function (feed) {
                        if (feed.responseText == 'class_already_shared') {
                            alert("\"" + ToShare + '"  has already been shared to  "' + ShareTo + "\"");
                        }

                        if (feed.responseText == 'class_shared') {
                            alert("\"" + ToShare + '"  is now shared with "' + ShareTo + "\"");
                        }

                        if (feed.responseText == 'member_not_exist') {
                            alert('User with ID  "' + ShareTo + '"  does not exist');
                        }

                        if (feed.responseText == 'class_unsharedd') {
                            alert('Class Sharing Error. Try again');
                        }

                        window.location.href = '../dashboard';
                    }
                });
            }
        })
    }

    // view classes shared to user
    var ImportedClass = document.getElementById('inheritted-class');
    if (ImportedClass) {
        ImportedClass.addEventListener('click', function () {
            swapView('DashHome', 'import-classes');
        });
    }
})();