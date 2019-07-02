/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

function classifier(input) {
  // Your code should go here.
  const students = JSON.parse(JSON.stringify(input));
  students.map((student) => {
    var today = new Date();
    var birthDate = new Date(student.dob)
    student.age = today.getFullYear() - birthDate.getFullYear();
    // var m = today.getMonth() - birthDate.getMonth();
    // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //     student.age = student.age - 1;
    // }
  });

  // sort the data according to student's age in ascending order
  students.sort((a, b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0));


  var output = {};
  var members = [];
  var no = 1;
  var noOfGroups = 0;

  for (var i = 0; i < students.length; i++) {
    if (members.length) {
      if (members.length === 3) {
        output[`group${no}`] = processMembers(members);
        noOfGroups++;
        no++;
        members = [];
        members.push(students[i]);
      } else if (members.length < 3) {
        if ((students[i].age - members[0].age) > 5) {
          output[`group${no}`] = processMembers(members);
          noOfGroups++;
          no++;
          members = [];
          members.push(students[i]);
        } else {
          members.push(students[i]);
        }
      }
    } else {
      members.push(students[i]);
    }

    if (i === (students.length - 1) && members.length) {
      output[`group${no}`] = processMembers(members);
      noOfGroups++;
      members = [];
    }
  };

  output = {...output, noOfGroups};
   
  return output;
}

function processMembers(arrayOfMembers) {
  var members = [];
  var regNos = [];
  var sum = 0;
  var oldest = 0;

  arrayOfMembers.forEach(function(mem, i) {
    members.push({
      name: mem.name,
      age: mem.age,
      dob: mem.dob,
      regNo: mem.regNo
    });
    regNos.push(Number(mem.regNo));
    regNos.sort((a, b) => a - b);
    oldest = mem.age
    sum = sum + mem.age;
  });
  
  return { members, regNos, sum, oldest };
};

module.exports = classifier;
