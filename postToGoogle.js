/* Aditya Dhulipala */
/* Sai Center Region 8 Form, ver 0.1 */
/* 6/25 */

function validate(what, which) {
    switch(what) {
        case 'name':
            
        break;
        
        
    }
}

function validateFormFields() {
    $('.namefield').map(function() {
        if(!validate('name', this.value)) {
            this.placeholder = 'Invalid';
        }
    });
}


//totalpersonsattending
var totalcount = 0;

function addperson(which) {
	var person = "#person" + which;
	var previousremovepersonbutton = "#removepersonbutton" + (which - 1);

	var thisaddpersonbutton = "#addpersonbutton" + which;
	var thisremovepersonbutton = "#removepersonbutton" + which;
	var nextaddpersonbutton = "#addpersonbutton" + (which + 1);
	var nextremovepersonbutton = "#removepersonbutton" + (which + 1);
	$(person).slideDown();
	
	if ($(nextremovepersonbutton).is(':hidden')) {
		$(nextaddpersonbutton).slideDown();
		$(previousremovepersonbutton).slideUp();
	}
	
	else if (which === 6) {
		$(previousremovepersonbutton).slideUp();
	}
	
	$(thisaddpersonbutton).slideUp(20, function() { 
			$(thisremovepersonbutton).slideDown();

	});
}

function removeperson(which) {
	var person = "#person" + which;
	var previousremovepersonbutton = "#removepersonbutton" + (which - 1);
	var thisaddpersonbutton = "#addpersonbutton" + which;
	var thisremovepersonbutton = "#removepersonbutton" + which;
	var nextaddpersonbutton = "#addpersonbutton" + (which + 1);
	
	var name = "#nameparticipant" + which;
	var age = "#ageparticipant" + which;
	var attending_sat = "#attending_sat" + which;
	var attending_sun = "#attending_sun" + which;
	
	$(name).val("");
	$(age).val("");
	$(attending_sat).attr("checked", false);
	$(attending_sun).attr("checked", false);
	
	$(person).slideUp();
	$(nextaddpersonbutton).slideUp();
		
	$(thisremovepersonbutton).slideUp(20, function() {
			$(previousremovepersonbutton).slideDown();
			$(thisaddpersonbutton).slideDown();

	});
	

}


function registerPerson (name, age, satp, sunp, satlunches, satboxes, sunlunches, sunboxes) {
    var groupfamilyname = $("#groupfamilyname").val();
    var sat = satp;
    var sun = sunp;
    
    var satlunch = satlunches;
    var satdinner = satboxes;
    var sunlunch = sunlunches;
    var sundinner = sunboxes;
	
	
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var phone = $("#phone").val();
    var altphone = $("#alternatephone").val();
    var email = $("#email").val();
    
    //updateCost();
    
    var totalcost = $("#totalcost").html();
    var center = $("#saicenter option:selected").html();
    var payment = $("input[name=payment]:checked").val();
    totalcost += " - " + payment;

    $.ajax({
            url: "https://docs.google.com/forms/d/1QeCq3i5-yayVUalG8zULImKBt1IZpW4DN3dvWvldgbM/formResponse",
            data: {
                "entry.1028821986"  : groupfamilyname,
                "entry.1989572619"  : name,
                "entry.1455524712"  : age,
                "entry.1692495978"  : sat,
                "entry.1063897397"  : sun,
                "entry.1808741032"  : satlunch,
                "entry.28805167"    : sunlunch,
                "entry.1762204858"  : satdinner,
                "entry.2083881354"  : sundinner,
                "entry.384955973"  	: address,
                "entry.182164071"   : city,
                "entry.2144561875"  : state,
                "entry.1511475308"  : zip,
                "entry.501938484"   : phone,
                "entry.548996382"   : altphone,
                "entry.161421504"   : email,             
                "entry.1206432407"  : center, 
                "entry.1868561769"  : totalcost},
            type: "POST",
            dataType: "xml",
            timeout: 5000,
            success: function(data, textStatus ){
                alert('request successful');
            },
            error: function(xhr, textStatus, errorThrown){
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }
            
        });
}


function updateCost() {

    ///TESTING validateFormFields()
    // To-be called beginning of postToGoogle()
    validateFormFields();

    // Get all age fields
    // Update costfield
    
    var ages = new Array();
    ages[0] = "18"; //$("#ageparticipant1").val().trim();
    ages[1] = $("#ageparticipant2").html().value; //$("#ageparticipant2").val().trim();//
    ages[2] = $("#ageparticipant3 option:selected").html();
    ages[3] = $("#ageparticipant4 option:selected").html();
    ages[4] = $("#ageparticipant5 option:selected").html();
    
    var cost = 0;
    
	var count = 0;
    var attending_sat = $("#daysattending-saturday").prop('checked');
    var attending_sun = $("#daysattending-sunday").prop('checked');
	
	if ($("#attending_sat1").prop('checked')  && $("#attending_sun1").prop('checked')) {
		count = 2;
	}
	
	else if ($("#attending_sat1").prop('checked') ||  $("#attending_sun1").prop('checked')) {
		count = 1;
	}
	
	
	if ($("#attending_sat2").prop('checked')  && $("#attending_sun2").prop('checked')) {
		
		if (!($("#ischild2").prop('checked')) ) { //ages[1]
			count += 2;
		}
	}
	
	else if ($("#attending_sat2").prop('checked') ||  $("#attending_sun2").prop('checked')) {
		//console.log($("#agepartcipant2").html().val());//console.log(document.getElementByID("ageparticipant2").value);// ("#ageparticipant2").val().trim());//
		if (!($("#ischild2").prop('checked'))){//$("#ageparticipant2 option:selected").html() > 18 ){
			count += 1;
		}
	}
	if ($("#attending_sat3").prop('checked')  && $("#attending_sun3").prop('checked')) {
		
		if (!($("#ischild3").prop('checked'))) {
			count += 2;
		}
	}
	
	else if ($("#attending_sat3").prop('checked') ||  $("#attending_sun3").prop('checked')) {
		if (!($("#ischild3").prop('checked'))) {
			count += 1;
		}
	}
	
	if ($("#attending_sat4").prop('checked')  && $("#attending_sun4").prop('checked')) {
		if (!($("#ischild4").prop('checked'))) {
			count += 2;
		}
	}
	
	else if ($("#attending_sat4").prop('checked') ||  $("#attending_sun4").prop('checked')) {
		if (!($("#ischild4").prop('checked'))) {
			count += 1;
		}
	}
	
	if ($("#attending_sat5").prop('checked')  && $("#attending_sun5").prop('checked')) {
		if (!($("#ischild5").prop('checked'))) {
			count += 2;
		}
	}
	
	else if ($("#attending_sat5").prop('checked') ||  $("#attending_sun5").prop('checked')) {
		if (!($("#ischild5").prop('checked'))) {
			count += 1;
		}
	}
	
	
	if ($("#attending_sat6").prop('checked')  && $("#attending_sun6").prop('checked')) {
		if (!($("#ischild6").prop('checked'))) {
			count += 2;
		}
	}
	
	else if ($("#attending_sat6").prop('checked') ||  $("#attending_sun6").prop('checked')) {
		if (!($("#ischild6").prop('checked'))) {
			count += 1;
		}
	}
	
	cost = count * 10;
	document.getElementById("test_id").value = cost;
    $("#totalcost").html("$"+cost);
    
}

function postToGoogle() {
    
	
	
	var satlunches = 1;
	var sunlunches = 1;
	
	var satboxes = 1;
	var sunboxes = 1;
	
    var i = 1;
    for (i = 1; i <= 6; i += 1) {
        var name = "#nameparticipant" + i;
        var age = "#ageparticipant" + i;
        
		name = $(name).val().trim();
		age = $(age).val();
		
		// For old people
		if (isNaN(age)) {age = 99;}
		
		
		var issat = "#attending_sat" + i;
		var issun = "#attending_sat" + i;
		
		var satlunch = "#lunch_sat" + i;
		var sunlunch = "#lunch_sun" + i;
		
		var satbox = "#box_sat" + i;
		var sunbox = "#box_sun" + i;
		
		if (! ($("#ischild" + i).prop('checked'))) {
			totalcount += 1;
			
			// Attending both days?
			if ($(issat).prop('checked') && $(issun).prop('checked')) {
				totalcount += 1;
			}
		}
		
		
		var sat = 'No';
		var sun = 'No';
		
		if ($(issat).prop('checked')) {
			sat = 'Yes';
			if ($(satlunch).prop('checked')) {
				sat += ' Lunch';
				satlunches += 1;
			}
			if ($(satbox).prop('checked')) {
				sat += ' - Box';
				satboxes += 1;
			}
		}
		
		if ($(issun).prop('checked')) {
			sun = 'Yes';
			if ($(sunlunch).prop('checked')) {
				sun += ' Lunch';
				sunlunches += 1;
			}
			if ($(sunbox).prop('checked')) {
				sun += ' - Box';
				sunboxes += 1;
			}
		}
		
        if (name != "" && age != "") {
            registerPerson(name, age, sat, sun, satlunches, satboxes, sunlunches, sunboxes);
        }
    }
		console.log("I entered the data into the sheet");

    /*
    
entry.1028821986:	1 Group / Family Name	
entry.1989572619:	2 Name
entry.1455524712:	3 Age
entry.1692495978:	4 Attending Saturday
entry.1063897397:	5 Attending Sunday
entry.1808741032:	6 Saturday Lunches
entry.28805167:	    7 Sunday Lunches
entry.1762204858:	8 Saturday Dinners
entry.2083881354:	9 Sunday Dinners
entry.384955973:	10 Address
entry.182164071:	11 City
entry.2144561875:	12 State
entry.1511475308:	13 Zip
entry.501938484:	14 Phone Number
entry.548996382:	15 Alt Phone
entry.161421504:	16 Email
entry.1206432407:	17 Sai Center
entry.1868561769:	18 Cost for Family



  -------------------------------  
    
    
    
    
    entry.548996382:	15
entry.501938484:	14
entry.384955973:	10
entry.28805167:	7
entry.2144561875:	12
entry.2083881354:	9
entry.1989572619:	2
entry.1868561769:	18
entry.182164071:	11
entry.1808741032:	6
entry.1762204858:	8
entry.1692495978:	4
entry.161421504:	16
entry.1511475308:	13
entry.1455524712:	3
entry.1206432407:	17
entry.1063897397:	5
entry.1028821986:	1





    
    
entry.1989572619:	2123
entry.1692495978:	213123
entry.1455524712:	213123
entry.1028821986:	
*/

setInterval(updateCost, 100);

}
