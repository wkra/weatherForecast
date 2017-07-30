document.addEventListener("DOMContentLoaded", function () {


  // USER CONTROLLER
  var userController = (function(){

    // user constructor
    var User = function(id, name, password, firstName, lastName, dateBirth, group){
      this.id = id;
      this.name = name;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateBirth = dateBirth;
      this.group = group;
    };

    // group constructor
    var Group = function(id, name){
      this.id = id;
      this.name = name;
    };

    // temporary data
    var data = {
      users: [],
      groups: [],
    };

    var selectedUserId = -1;
    var selectedGroupId = -1;

    // public methods
    return{

      getDataFromDB: function (callback){
        /*GET USERS FROM DB*/
        $.ajax({
          type:"GET",
          url:"php/getData.php",
          cache: false, //**
          data: {table: "users"},
          contentType:"application/json; charset=utf-8",
          dataType:'json',

          success: function(json) {

            for (i=0;i<json.length;i++){
              var newUserFromDB = new User (json[i][0], json[i][1], json[i][2], json[i][3], json[i][4], json[i][5], json[i][6]);

              data.users.push(newUserFromDB)
            }

            /*GET GROUPS FROM DB*/
            $.ajax({
              type:"GET",
              url:"php/getData.php",
              cache: false, //**
              data: {table: "groups"},
              contentType:"application/json; charset=utf-8",
              dataType:'json',

              success: function(json) {

                for (i=0;i<json.length;i++){
                  var newGroupFromDB = new Group (json[i][0], json[i][1]);

                  data.groups.push(newGroupFromDB)
                }
                //function callback
                if($.isFunction(callback)) {callback();};
              },
              error: function(err) {
                alert( "Error");
                console.log(err);
              }

            });

          },
          error: function(err) {
            alert( "Error");
            console.log(err);
          }
        });
      },

      getData: function(){
        return data;
      },


      addToDB: function(option, obj, callback){

        // set table name
        var tableName = option + "s";

        //add do DB
          $.ajax({
            type:"POST",
            url:"php/add.php",
            cache: false, //**
            data: {
              table: tableName,
              name: obj.name,
              password: obj.password,
              firstName: obj.firstName,
              lastName: obj.lastName,
              dateBirth: obj.dateBirth,
              group: obj.group,
            },
            dataType : 'text',

            success:function() {
              //function callback
              if($.isFunction(callback)) {callback();};
            },
            error: function(error) {
              alert( "Error");
              console.log(error);
            }
          });
      },

      // set flag for selected user row
      setSelectedUserId: function(val){
        selectedUserId = val;
      },

      getSelectedUserId: function(){
        return selectedUserId;
      },

      // set flag for selected group row
      setSelectedGroupId: function(val){
        selectedGroupId = val;
      },

      getSelectedGroupId: function(){
        return selectedGroupId;
      },

      removeFromDB: function(option, idVal, callback){

        // set table name
        var tableName = option + "s";

          // remove
            $.ajax({
              type:"POST",
              url:"php/remove.php",
              cache: false, //**
              data: {
                table: tableName,
                id: idVal,
              },
              dataType : 'text',

              success : function() {
                if($.isFunction(callback)) {callback(data);};
              },

              error: function(err) {
                alert( "Error.");
                console.log(err);
              }
            });
      },

      editInDB: function(option, idVal, obj, callback){

        // set table name
        var tableName = option + "s";

        //edit
          $.ajax({
            type:"POST",
            url:"php/edit.php",
            cache: false, //**
            data: {
              table: tableName,
              id: idVal,
              name: obj.name,
              password: obj.password,
              firstName: obj.firstName,
              lastName: obj.lastName,
              dateBirth: obj.dateBirth,
              group: obj.group,
            },
            dataType : 'text',

            success:function() {
              //function callback
              if($.isFunction(callback)) {callback();};
            },

            error: function(error) {
              alert( "Error");
              console.log(error);
            }
          });
      },

      changeNameToIdGroup: function(obj){

        for (i=0; i < data.groups.length; i++){
          if (obj.group == data.groups[i].name){
            obj.group = data.groups[i].id;
            break;
          };
        };

        return obj;
        },
      removeTempData: function(){
        data.users.splice(0,data.users.length);
        data.groups.splice(0,data.groups.length);
      }


     // end of return
    }
  })();
  // END USER CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      nameInput: ".nameInput",
      nameGroupInput: ".nameGroupInput",
      passwordInput: ".passwordInput",
      firstNameInput: ".firstNameInput",
      lastNameInput: ".lastNameInput",
      dateBirthInput: ".dateBirthInput",
      selectUserInput: ".selectUserInput",
      selectGroupInput: ".selectGroupInput",
      addUserBtn: ".addUserBtn",
      editUserBtn: ".editUserBtn",
      remUserBtn: ".remUserBtn",
      userListTable: ".userListTable",
      groupListTable: ".groupListTable",
      idList: ".idList",
      idGroupList: ".idGroupList",
      nameList: ".nameList",
      nameGroupList: ".nameGroupList",
      passwordList: ".passwordList",
      firstNameList: ".firstNameList",
      lastNameList: ".lastNameList",
      dateBirthList: ".dateBirthList",
      groupList: ".groupList",
      dangerClass: ".danger",
      addGroupBtn: ".addGroupBtn",
      editGroupBtn: ".editGroupBtn",
      remGroupBtn: ".remGroupBtn",

    };

    //public methods
    return {
      getDOMstrings: function(){
        return DOMstrings;
      },

      printUserList: function(data){
        for (i=0;i<data.users.length;i++){

          var html = '<tr><th scope="row" class="idList">%id%</th><td class="nameList">%name%</td><td class="passwordList">%password%</td><td class="firstNameList">%firstName%</td><td class="lastNameList">%lastName%</td><td class="dateBirthList">%dateBirth%</td><td class="groupList">undefined</td></tr>';
          var newHtml = html.replace('%name%', data.users[i].name);
          var newHtml = newHtml.replace('%id%', data.users[i].id);
          var newHtml = newHtml.replace('%password%', data.users[i].password);
          var newHtml = newHtml.replace('%firstName%', data.users[i].firstName);
          var newHtml = newHtml.replace('%lastName%', data.users[i].lastName);
          var newHtml = newHtml.replace('%dateBirth%', data.users[i].dateBirth);

          //find group name
          for (ii=0;ii < data.groups.length;ii++){
            if(data.users[i].group == data.groups[ii].id){
              var newHtml = newHtml.replace('undefined', data.groups[ii].name);
              break;
            }
          }

          $(DOMstrings.userListTable).append(newHtml)
        };

      },

      printGroupList: function(data){
        for (i=0;i<data.groups.length;i++){

          var html = '<tr><th scope="row" class="idGroupList">%id%</th><td class="nameGroupList">%name%</td></tr>';
          var newHtml = html.replace('%name%', data.groups[i].name);
          var newHtml = newHtml.replace('%id%', data.groups[i].id);

          $(DOMstrings.groupListTable).append(newHtml)
        };

      },

      printSelectInputInUserList: function(data){

        for (i=0;i<data.groups.length;i++){

          var html = '<option value="'+data.groups[i].name +'">%option%</option>';
          var newHtml = html.replace('%option%', data.groups[i].name);

          $(DOMstrings.selectUserInput).append(newHtml)

        };

      },
      removeSelectInputInUserList: function(){
        $(DOMstrings.selectUserInput).empty();
      },

      getInputsValues: function(option){

        if (option === 'user'){
          var addUserData = {
            name: $(DOMstrings.nameInput).val(),
            password: $(DOMstrings.passwordInput).val(),
            firstName: $(DOMstrings.firstNameInput).val(),
            lastName: $(DOMstrings.lastNameInput).val(),
            dateBirth: $(DOMstrings.dateBirthInput).val(),
            group: $(DOMstrings.selectUserInput).val(),
          };
        }
          if (option === 'group'){
            var addUserData = {
              name: $(DOMstrings.nameGroupInput).val(),
            };
          };

        return addUserData;
      },

      clearInputs: function(){
        // user inputs
        $(DOMstrings.nameInput).val("");
        $(DOMstrings.passwordInput).val("");
        $(DOMstrings.firstNameInput).val("");
        $(DOMstrings.lastNameInput).val("");
        $(DOMstrings.dateBirthInput).val("");

        // group input
        $(DOMstrings.nameGroupInput).val("");

      },

      takeDataFromRow: function(option, data){

        var parentNode = $(data).parent();

        if (option === 'user'){
          var selectedUser = {
            id: $(parentNode).find(DOMstrings.idList).text(),
            name: $(parentNode).find(DOMstrings.nameList).text(),
            password: $(parentNode).find(DOMstrings.passwordList).text(),
            firstName: $(parentNode).find(DOMstrings.firstNameList).text(),
            lastName: $(parentNode).find(DOMstrings.lastNameList).text(),
            dateBirth: $(parentNode).find(DOMstrings.dateBirthList).text(),
            group: $(parentNode).find(DOMstrings.groupList).text(),
          };
        } if (option === 'group'){
          var selectedUser = {
            id: $(parentNode).find(DOMstrings.idGroupList).text(),
            name: $(parentNode).find(DOMstrings.nameGroupList).text(),
          };
        }
        return selectedUser;
      },

      putSelectedDataInInputs: function(data){
        $(DOMstrings.nameInput).val(data.name);
        $(DOMstrings.passwordInput).val(data.password);
        $(DOMstrings.firstNameInput).val(data.firstName);
        $(DOMstrings.lastNameInput).val(data.lastName);
        $(DOMstrings.dateBirthInput).val(data.dateBirth);
        $(DOMstrings.selectUserInput).val(data.group);
      },

      putSelectedDataInGroupInputs: function(data){
        $(DOMstrings.nameGroupInput).val(data.name);

      },
      removeUserList: function(){
        $(DOMstrings.userListTable).empty();
      },
      removeGroupList: function(){
        $(DOMstrings.groupListTable).empty();
      }


    }
  })();
  // END UI CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var DOMstrings = UIController.getDOMstrings();

    // events listeners
    var setupEventListeners = function(){

      //selected user
      $(DOMstrings.userListTable).click(function(event){
        ctrlSelectedData('user', event.target);
      });

      //selected group
      $(DOMstrings.groupListTable).click(function(event){
        ctrlSelectedData('group', event.target);
      });

      // remove user btn
      $(DOMstrings.remUserBtn).click(function(){
        ctrlRemove('user');
      });

      // remove group btn
      $(DOMstrings.remGroupBtn).click(function(){
        ctrlRemove('group');
      });

      // add user btn
      $(DOMstrings.addUserBtn).click(function(){
        ctrlAdd('user');
      });

      // add group btn
      $(DOMstrings.addGroupBtn).click(function(){
        ctrlAdd('group');
      });

      // edit user btn
      $(DOMstrings.editUserBtn).click(function(){
        ctrlEdit('user');
      });

      // edit group btn
      $(DOMstrings.editGroupBtn).click(function(){
        ctrlEdit('group');
      });

    };

    var clearAllAndPrint = function(){
      //remove lists
      UIController.removeUserList();
      UIController.removeGroupList();
      UIController.removeSelectInputInUserList();

      // clear inputs
      UIController.clearInputs();

      //remove temp data
      userController.removeTempData();

      //print new lists
      userController.getDataFromDB(function(data){
        var data = userController.getData();
        UIController.printUserList(data);
        UIController.printGroupList(data);
        UIController.printSelectInputInUserList(data);
      });
    };

    var ctrlSelectedData = function(option, el) {

      // class with no dot
      var dangerNoDot = DOMstrings.dangerClass.slice(1)

      // part of putting data to inputs
      var selectedData = UIController.takeDataFromRow(option, el);

      // no selected row
      if ($(DOMstrings.dangerClass).length === 0){

        // select row
        $(el).parent().addClass(dangerNoDot);

        // put selected data to user inputs
        if (option === "user"){
          // put data in inputs
          UIController.putSelectedDataInInputs(selectedData);

          // set selected user id
          userController.setSelectedUserId(selectedData.id);

        // put selected data to group inputs
        } if (option === "group"){
          // put data in inputs
          UIController.putSelectedDataInGroupInputs(selectedData);

          // set selected group id
          userController.setSelectedGroupId(selectedData.id);
        }
      // selected row but click on difrend row
      } else if ($(el).parent().hasClass(dangerNoDot) === false){

        // unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        // clear all Inputs
        UIController.clearInputs();

        // set all selected id to -1
        userController.setSelectedUserId(-1);
        userController.setSelectedGroupId(-1);

        //select row
        $(el).parent().addClass(dangerNoDot);

        // put selected data to user inputs
        if (option === "user"){

          // put data in inputs
          UIController.putSelectedDataInInputs(selectedData);

          // set selected user id
          userController.setSelectedUserId(selectedData.id);

        // put selected data to group inputs
        } if (option === "group"){

          // put data in inputs
          UIController.putSelectedDataInGroupInputs(selectedData);

          // set selected group id
          userController.setSelectedGroupId(selectedData.id);
        }

        // selected row and click on the same row
      } else {
        //unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        // clear all  Inputs
        UIController.clearInputs();

        // set all selected id to -1
        userController.setSelectedUserId(-1);
        userController.setSelectedGroupId(-1);
      };

    };

    var ctrlAdd = function (option){

      // get Data from inputs
      var input = UIController.getInputsValues(option);

        // if user - change group name to group id
        if (option === 'user'){
          var input = userController.changeNameToIdGroup(input)
        };

        // add item to data
        var newItem = userController.addToDB(option, input, function(){

          //clear all and print new all
          clearAllAndPrint();

          // set all selected id to -1
          userController.setSelectedUserId(-1);
          userController.setSelectedGroupId(-1);

          //feedback
          alert(option + " added.");
        });

      };

    var ctrlRemove = function(option){
      // get selected user flag
      var selectedId = -1;
      if (option === 'user'){
        selectedId = userController.getSelectedUserId();
      } else if (option === 'group'){
        selectedId = userController.getSelectedGroupId();
      }

    //check is the user selected
      if (selectedId < 0){
        alert("Please select " + option + ".")
      } else {

        //remove user with callback function
        userController.removeFromDB(option, selectedId, function(){

          // clear and print
          clearAllAndPrint()

          // set all selected id to -1
          userController.setSelectedUserId(-1);
          userController.setSelectedGroupId(-1);

          // feedback success
          alert(option + " removed.");

        });
    }

    };

    var ctrlEdit = function(option){
      // get selected user flag
      var selectedId = -1;
      if (option === 'user'){
        selectedId = userController.getSelectedUserId();
      } if (option === 'group'){
        selectedId = userController.getSelectedGroupId();
      }

      //check is the user selected
      if (selectedId < 0){
        alert("Please select " + option + ".")
      } else {

        // get data from inputs
        var dataInputs = UIController.getInputsValues(option);

        // put id to data
        dataInputs.id = selectedId;

        // change group name to group id
        if (option === 'user'){
          dataInputs = userController.changeNameToIdGroup(dataInputs);
        }

        //edit user
        userController.editInDB(option, selectedId, dataInputs, function(){

          //clear all and print new all
          clearAllAndPrint();

          // set all selected id to -1
          userController.setSelectedUserId(-1);
          userController.setSelectedGroupId(-1);

          // feedback
          alert(option + " edited.")
        });
      }

    };

    return {
      init: function(){
        console.log("App has started");
        userController.getDataFromDB(function(data){
          var data = userController.getData();
          UIController.printUserList(data);
          UIController.printGroupList(data);
          UIController.printSelectInputInUserList(data);
          setupEventListeners();
        })

      }
    }

  })(userController, UIController);
  // END GLOBAL APP CONTROLLER

  controller.init();

  // end DOMContentLoaded
});

