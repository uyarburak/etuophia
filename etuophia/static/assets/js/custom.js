$(function(){

	
	/***************************************
	 Color Box Border
	***************************************/
	$(".box-color .box-title").append("<div class='box-title-border'></div>");
	
	
	
	
	/***************************************
	 Bootstrap Dropdown Menu
	***************************************/
	$('.dropdown-toggle').dropdown(); 
	
	
	
	
	
	/***************************************
	 Slimscroll Bar (Autohide)
	***************************************/
		
	var topPos = $(window).width() <= 768 ? '0px' : 'auto'

	
	$("aside#left_panel").slimscroll({
	
		width:'270px',
		height: 'auto',
		size: '3px',
		position: 'right',
		color: '#666'
	
	}).parent().css({
		'position': 'fixed',
		'top': topPos,
	});
	
	
	
	
		
	/***************************************
	 Slimscroll Bar (Show)
	***************************************/

	$(".overflow-scroll.visible-scroll").each(function(){

		$(this).slimscroll({

			size: '4px',
			height:'auto',
			alwaysVisible: true,
			color: '#666'
		
		})
	
	});
	
	
	
	
	
	
	/***************************************
	 Toggle Top Menu and Aside
	***************************************/
	$(".toggle-topmenu").click(function(){
		$('nav#main_topnav ul').slideToggle();
	});
	
	//Click Devices
	$(".toggle-aside").on('click', function(){
		slideAside()
	});
	
	
	
	/***************************************
	 Some Global Variable
	***************************************/
	var winHeight = $(window).height();
	var headHeight = $('header').innerHeight();
	var navHeight = $('nav#main_topnav').innerHeight();
	
	
	
	
	/*Set Aside Height*/
	function asideHeight(){
		$('aside').height( '100%' );
	}
	
	asideHeight()
	
	
	
	
	
	function slideAside(){
		$('section#main_content, nav#main_topnav, header').toggleClass('movefor-aside');
		$('aside').toggleClass('asideopen');
		setTimeout(" $('body, html').toggleClass('overf-hide')",150);
	}
	
	
	
	function swipeAside(){
		
		$("body, *, html, document").swipe({			
		swipeRight:function() { 
		$('section#main_content, nav#main_topnav, header').addClass('movefor-aside');
		$('aside').addClass('asideopen');
		},
		swipeLeft:function() { 
		$('section#main_content, nav#main_topnav, header').removeClass('movefor-aside');
		$('aside').removeClass('asideopen');
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
  		threshold:75
		});
		
	}
	
	
	
	//Touch Devices
	$(window).resize(function() {
		
		asideHeight()
							  
		if ($(window).width() <= 768) {
			swipeAside()
		}
		
 	});
	
	if ($(window).width() <= 768) {
		swipeAside()	
	}

	
	
	
	
	
	
	
	
	
		
	
	
	
	
	/***************************************
	 Fixed Position After Scroll
	***************************************/

	$("nav#main_topnav").css({"top":Math.max(0,70-$(this).scrollTop())});
	$("aside#left_panel").css("top",Math.max(50,120-$(this).scrollTop()));
	$(window).scroll(function(){
		$("nav#main_topnav").css({"top":Math.max(0,70-$(this).scrollTop())});
		$("aside#left_panel").css("top",Math.max(50,120-$(this).scrollTop()));
	});
	

	
	
	
	
	/***************************************
	 Aside Dropdown Menu
	***************************************/
	$("nav#aside_nav > ul > li").click(function(){
		$(this).children('ul').slideToggle();
		$(this).siblings('li.open').removeClass('open').children('ul').slideToggle();
		$(this).has('ul').toggleClass('open');
	})
	
	

	
	
	/***************************************
	 Metro Table
	***************************************/
	$('.metro-table tbody tr td').each(function(){
		$(this).wrapInner('<span></span>')
	});
	
	
	
	
	
	
	
	
	/***************************************
	 Full Calendar
	***************************************/

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	
	var calendar = $('#calendar').fullCalendar({
		header: {
			left: 'title',
			right: 'prev,next today,month,agendaWeek,agendaDay'
		},
		selectable: true,
		selectHelper: true,
		select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
		},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date, allDay) { // this function is called when something is dropped
			
				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');
				
				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);
				
				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;
				
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
				
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
		},
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		]
	});
	

	/* initialize the external events
		-----------------------------------------------------------------*/
	
	var dragEvent = function(ed) {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim(ed.text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		ed.data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		ed.draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	};
		
	
	$(document).on('click', '#add-event',function(){
		
		var eventValue = $('#event-value').val();
		
		if( $('#event-value').val() == 0 ){
			var eventValue = "Untitled Event"
			}
		
		var eventHTML = $('<li>'+eventValue+'</li>')
		$('ul.events-list').prepend(eventHTML)
		dragEvent(eventHTML)
	});
	
	
	$('ul.events-list li').each(function () {
               dragEvent($(this))
     });	
		
		
	$('td.fc-header-center').remove()
	 
	
	
	
	
	
	
	
	
	/***************************************
	 Popovers
	***************************************/
		
	$(".popovers").popover({
		trigger: $(this).attr('trigger'),
		title: $(this).attr('title'),
		position: $(this).attr('placement'),
		content: $(this).attr('content')
	});
	
	
	
	
	
	
	
	/***************************************
	 Tooltips
	***************************************/
	
	$('.tooltip-demo').tooltip({
		position: $(this).attr('placement')
	});
	
	
	
	
	
	
	/***************************************
	 Visualize Charts
	***************************************/

	// Charts	
	function drawCharts(sourceTable) {
	
		
		var chartWidth = $('#areachart').parent('div').width() - 25;
		
			sourceTable.hide().visualize({
				type: 'area',
				width: chartWidth,
				height: 250,
				lineDots: 'double',				
				lineWeight: 3,
				multiHover: 5,
				appendTitle: false,
				appendKey: false
				
			}).appendTo('.stats_charts').trigger('visualizeRefresh');;

		$('.visualize,  .visualize-area').css('margin', '0px 0px 20px 22px');
	}
	
	
	// Init the charts
	$('table.stats').each(function() {
		drawCharts( $(this) );
	});
	
	
	// Redraw the carts
	$(window).resize(function() {
		$('.visualize').remove();
		
		$('table.stats').each(function() {
			drawCharts( $(this) );
		});
	});
	
	
	
	
	
	
	
	
	
	/***************************************
	 Box Toolbar buttons
	***************************************/
	
	/*refreash*/
	$('.reload-box').click(function(){
		$(this).parent().parent().parent().parent().find('.panel-body').prepend('<div class="box-loader"></div>');
		$(this).parent().parent().parent().parent().find('.panel-body .box-loader').delay(3000).fadeOut('slow', function(){ $(this).remove() });
		return false;
	});

	
	/*minimize mazimize*/
	$('.mini-max').click(function(){
		$(this).parent().parent().parent().parent().find('.panel-body').slideToggle('fast');
		return false;
	});
	
	/*close*/
	$('.close-box').click(function(){
		$(this).parent().parent().parent().parent().fadeTo(400, 0, function () {$(this).hide(400, function(){ $(this).remove()});});
		return false;
	});
	





	/***************************************
	 Static Notifications
	***************************************/
	
	$('.notification').click(function(){
		$(this).parent().fadeTo(400, 0, function () {$(this).hide(400, function(){ $(this).remove()});});
		return false;
	});
	
	
	
	
	
	
	/***************************************
	 Input File styling
	***************************************/
	
	$('input[type=file].styled').each(function(){
		
		$(this).css({'opacity':'0', 'height':'0px', 'width':'0px'})
		var getClass = $(this).attr('class')
		$(this).before('<div class="styled-input-file '+ getClass +'"><div class="input-file-box"><input type="text" class="form-control col-lg-12"></div><input type="button" value="Browse" class="btn gray-bg"></div>');
		
		 var btnWidth = $(this).siblings('.styled-input-file').find('.btn').innerWidth();
		 
		 $('.styled-input-file .input-file-box').css('marginRight', btnWidth + 'px')
		
	});
	
	
	$('.styled-input-file').click(function(){
		
		$(this).siblings('input[type=file]').click();
		$(this).siblings('input[type=file]').change(function(){
			var inputVal = $(this).val()
			$(this).siblings('.styled-input-file').find('.input-file-box input').val(inputVal)
		});
		
	});
	
	
	
	
	
	/***************************************
	 Custom TagsInput
	***************************************/

	$('#tags_1').tagsInput({});

	$('.tagsinput').each(function(){
		
		var prevClass =  $(this).siblings('input').attr('class') 
		$(this).addClass( prevClass )	
		
	});
	
	
	
	
	
	
	/***************************************
	 Date/Time Picker - Bootstrap
	***************************************/
	
	/* 
	These are the default options for initializing the widget:
	  
	maskInput: true,           // disables the text input mask
	pickDate: true,            // disables the date picker
	pickTime: true,            // disables de time picker
	pick12HourFormat: false,   // enables the 12-hour format time picker
	pickSeconds: true,         // disables seconds in the time picker
	startDate: -Infinity,      // set a minimum date
	endDate: Infinity          // set a maximum date
	*/
	
	$('.datepicker').datetimepicker({
	 pickTime: false
    });
	
	
	$('.datetimepicker').datetimepicker({
		format: 'dd/MM/yyyy hh:mm',
		language: 'pt-BR'
    });
	
	
	$('.datetimepicker-12').datetimepicker({
     language: 'pt-BR',
     pick12HourFormat: true
    });
	
	
	$('.timepicker').datetimepicker({
     pickDate: false
    });
		
  
	
	
	
	
	
	
	
	/***************************************
	 Maskedinput
    ***************************************/

	$("#mask_date").inputmask("d/m/y", {autoUnmask: true});  //direct mask        
	$("#mask_date1").inputmask("d/m/y",{ "placeholder": "*"}); //change the placeholder
	$("#mask_date2").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy" }); //multi-char placeholder
	$("#mask_phone").inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
	$("#mask_tin").inputmask({"mask": "99-9999999"}); //specifying options only
	$("#mask_number").inputmask({ "mask": "9", "repeat": 10, "greedy": false });  // ~ mask "9" or mask "99" or ... mask "9999999999"
	$("#mask_decimal").inputmask('decimal', { rightAlignNumerics: false }); //disables the right alignment of the decimal input
	$("#mask_currency").inputmask('€ 999.999.999,99', { numericInput: true });  //123456  =>  € ___.__1.234,56
	$("#mask_currency2").inputmask('€ 999,999,999.99', { numericInput: true, rightAlignNumerics: false  }); //123456  =>  € ___.__1.234,56
	$("#mask_ssn").inputmask("999-99-9999", {placeholder:" ", clearMaskOnLostFocus: true }); //default
	$("#mask_callback").inputmask({ "mask": "9", "repeat": 5,  "oncomplete": function(){ alert('Callback Function !'); } }); // callback function

	
	
	
	
	
	/***************************************
	 MS Dropdown (images)
    ***************************************/
	
	$("#countries").msDropdown();
	
	
	
	
	
	/***************************************
	 Colorpicker
    ***************************************/
    
	/*Default Picker*/        
	$('input.minicolors-default').minicolors({

		swatchPosition: 'right',
		defaultValue:'#ed518d',
		
		change: function(hex, opacity) {
			// Generate text to show in console
			mdt = hex ? hex : 'transparent';
			if( opacity ) mdt += ', ' + opacity;
			mdt += ' / ' + $(this).minicolors('rgbaString');
			
			$('#mdtvalue').text(mdt)
		}
		
	});
	
	/*Without Input Field*/
	$('input.minicolors-nofield').minicolors({

		swatchPosition: 'right',
		defaultValue:'#ac54f0',
		textfield:false,
		
		change: function(hex, opacity) {
			// Generate text to show in console
			mnf = hex ? hex : 'transparent';
			if( opacity ) mnf += ', ' + opacity;
			mnf += ' / ' + $(this).minicolors('rgbaString');
			
			$('#mnfvalue').text(mnf)
		}
		
	});
	
	/*Inline Picker*/
	$('input.minicolors-inline').minicolors({

		defaultValue:'#ed518d',
		inline:true
		
	});
	
	
	
	
	
	
	/***************************************
	 Styled Checkbox and Radio buttons
    ***************************************/

	
	$(".icheck").each(function(){
		var $el = $(this);
		var skin = ($el.attr('data-skin') !== undefined) ? "_"+$el.attr('data-skin') : "",
		color = ($el.attr('data-color') !== undefined) ? "-"+$el.attr('data-color') : "";

		var opt = {
			checkboxClass: 'icheckbox' + skin + color,
			radioClass: 'iradio' + skin + color,
			increaseArea: "10%"
		}

		$el.iCheck(opt);
	});
	  
	

	
	$('.skin-line input').each(function(){
		var self = $(this),
		label = self.next(),
		label_text = label.text();
		
		label.remove();
		self.iCheck({
		checkboxClass: 'icheckbox_line-blue',
		radioClass: 'iradio_line-blue',
		insert: '<div class="icheck_line-icon"></div>' + label_text
		});
	});
	

	
	
	/*for color selector*/
  	$('.colors li').click(function() {
    var self = $(this);

    if (!self.hasClass('active')) {
      self.siblings().removeClass('active');

      var skin = self.closest('.skin'),
        color = self.attr('class') ? '-' + self.attr('class') : '',
        checkbox = skin.data('icheckbox'),
        radio = skin.data('iradio'),
        checkbox_default = 'icheckbox_minimal',
        radio_default = 'iradio_minimal';

      if (skin.hasClass('skin-square')) {
        checkbox_default = 'icheckbox_square', radio_default = 'iradio_square';
        checkbox == undefined && (checkbox = 'icheckbox_square-green', radio = 'iradio_square-green');
      };

      if (skin.hasClass('skin-flat')) {
        checkbox_default = 'icheckbox_flat', radio_default = 'iradio_flat';
        checkbox == undefined && (checkbox = 'icheckbox_flat-red', radio = 'iradio_flat-red');
      };

      if (skin.hasClass('skin-line')) {
        checkbox_default = 'icheckbox_line', radio_default = 'iradio_line';
        checkbox == undefined && (checkbox = 'icheckbox_line-blue', radio = 'iradio_line-blue');
      };

      checkbox == undefined && (checkbox = checkbox_default, radio = radio_default);

      skin.find('input, .skin-states .state').each(function() {
        var element = $(this).hasClass('state') ? $(this) : $(this).parent(),
          element_class = element.attr('class').replace(checkbox, checkbox_default + color).replace(radio, radio_default + color);

        element.attr('class', element_class);
      });

      skin.data('icheckbox', checkbox_default + color);
      skin.data('iradio', radio_default + color);
      self.addClass('active');
    };
  });

  
	
	
	
	
	/***************************************
	 Bootstrap wysihtml5
    ***************************************/
	
	$('.wysihtml5').wysihtml5();
	
	

	
	
	
	
	/***************************************
	 Form Validation
    ***************************************/
	
	$('#basic-validation').validate({
	    rules: {
			
	      firstname: "required",
		  
		  lastname: "required",
		  
		  username: {
			required: true,
			minlength: 2
		  },
			
	      email: {
	        required: true,
	        email: true
	      },
		  
	      subject: {
	      	minlength: 2,
	        required: true
	      },
		  
	      message: {
	        minlength: 2,
	        required: true
	      }
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
	  
	  
	  
	  $('#advanced-validation').validate({
	    rules: {
			
	      url: { 
	         url: true
	      },
		   
		  date: { 
	         date: true ,
			 required: true
	      },
		  
		  dateISO: { 
	         dateISO: true ,
			 required: true
	      },
		  
		  number: { 
	         number: true ,
			 required: true
	      },
		  
		  digits: { 
	         digits: true ,
			 required: true
	      },
		  
		  creditcard: { 
	         creditcard: true ,
			 required: true
	      },
		  
		   field: {
			 required: true,
			 extension: "xls|csv"
		   },
		  
		   password: "required",
			 password_again: {
			 equalTo: "#password",
			 required: true
		   },
		   
		    maxlenth: {
			  required: true,
			  maxlength: 4
			},
			
			minlenth: {
			  required: true,
			  minlength: 6
			},
			
			 range: {
				required: true,
				range: [13, 23]
			},
			
			 rangelength: {
				required: true,
				rangelength: [2, 6]
			}
		  
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
	  
	  $('#advanced-validation2').validate({
	    rules: {
		   	password: {
			  required: true,
			  minlength: 6
			},
			
			 password_again: {
			 equalTo: "#password",
			 required: true
		   }
		  
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
	  
	  	  $('#homework-validation').validate({
	    rules: {
		    duedate: {
			  required: true
			},
			homework: {
			  required: true
			}
		  
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
	   $('#edit-course-validation').validate({
	    rules: {
		    description: {
			  maxlength: 255
			},
			syllabus_url: {
			  url: true
			}
		  
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
		  	  $('#resource-validation').validate({
	    rules: {
		    image: {
			  required: true
			}
		  
	    },
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
	  });
	
	



	
	/***************************************
	 Wizard
    ***************************************/
	
	 $(".wizard").bwizard();
	 
	 
	 

	 
	 
	/***************************************
	 Buttons
    ***************************************/ 
	 
	$('.load-state')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('complete')
        }, 3000)
      });
	  
	  
	 $('.nav-tabs').button('toggle');
	 
	 






	/***************************************
	 Advanced Table 
    ***************************************/

	$('#student_table').dataTable({
						"sPaginationType": "bootstrap",
									"aLengthMenu": [
													[5, 10, 15, -1],
													[5, 10, 15, "All"] // change per page values here
												   ],
												// set the initial value
												"iDisplayLength": 10
    });
	
		$('#student_table2').dataTable({
						"sPaginationType": "bootstrap",
									"aLengthMenu": [
													[5, 10, 15, -1],
													[5, 10, 15, "All"] // change per page values here
												   ],
												// set the initial value
												"iDisplayLength": 10
    });
			$('#student_table3').dataTable({
						"sPaginationType": "bootstrap",
									"aLengthMenu": [
													[5, 10, 15, -1],
													[5, 10, 15, "All"] // change per page values here
												   ],
												// set the initial value
												"iDisplayLength": 10
    });

	$('#advanced-table').dataTable({
									"sPaginationType": "bootstrap",
									"aLengthMenu": [
													[5, 10, 15, -1],
													[5, 10, 15, "All"] // change per page values here
												   ],
												// set the initial value
												"iDisplayLength": 5
								  });
								  
	
	
	
	
	
	

	/***************************************
	 Ajax Modal
    ***************************************/

	var $modal = $('#ajax-modal');

	$('#ajax').on('click', function(){
	  // create the backdrop and wait for next modal to be triggered
	  $('body').modalmanager('loading');
	
	  setTimeout(function(){
		 $modal.load('modal_ajax_test.html', '', function(){
		  $modal.modal();
		});
	  }, 1000);
	});
	
	$modal.on('click', '.update', function(){
	  $modal.modal('loading');
	  setTimeout(function(){
		$modal
		  .modal('loading')
		  .find('.modal-body')
			.prepend('<div class="alert alert-info fade in">' +
			  'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
			'</div>');
	  }, 1000);
	});


	
	
	
	
	
	
	/***************************************
	 Sliders
    ***************************************/
	
	$('.slider').slider();
	
	var RGBChange = function() {
          $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
        };

        var r = $('#R').slider()
                .on('slide', RGBChange)
                .data('slider');
        var g = $('#G').slider()
                .on('slide', RGBChange)
                .data('slider');
        var b = $('#B').slider()
                .on('slide', RGBChange)
                .data('slider');

        $('#eg input').slider();
		
		
		






	/***************************************
	 Tiles
    ***************************************/	
		
	$('#tiles').freetile({
			animate: true,
			elementDelay: 30
		});		
	
	
	
	function showDashBoard(){
        $('.tile').each(function(){
            $(this).addClass('fadeInForward').removeClass('fadeOutback');
        });
    }
	
	
	function fadeDashBoard(){
        $('.tile').addClass('fadeOutback').removeClass('fadeInForward');
    }
	
	
	$('.tile').each(function(){
		
		$(this).click(function(){
		  
		  var Bgcolor = $(this).css('background-color'); 
		  $('.tile-page').addClass('openpage').css('background', Bgcolor);
		  fadeDashBoard()
		  
		});
	
  	});
	
	

	  $('.close-button').click(function(){
		$(this).parent().addClass('slidePageLeft').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
					$(this).removeClass('slidePageLeft').removeClass('openpage');
				  });
		showDashBoard();
	  });	
		
	
	
	
	
	
	/***************************************
	 Contact List
    ***************************************/

	$('#contact_list').sliderNav();
	
	
	
	
	/***************************************
	 Gallery
    ***************************************/
	
	$('ul.gallery li').each(function(){
	
		var imgTitle = $(this).find('img').attr('alt');
		var imgSrc =  $(this).find('img').attr('src');

		$(this).append('<div class="overlay-options"><a href="'+ imgSrc +'" title="'+imgTitle+'" data-gallery="gallery" class="btn green-bg"><i class="icon-">&#xf0b2;</i></a> &nbsp;<a href="#" id="delete-img" class="btn red-bg"><i class="icon-">&#xf014;</i></a></div>');
		
	});
	
	
	$(document).on('click','#delete-img', function(){
		
		var confirmDel=confirm("Are you sure")
		if (confirmDel==true)
		  {$(this).parent().parent().fadeTo(400, 0, function () {$(this).hide(400, function(){ $(this).remove()});});}
		
	});








	/***************************************
	 Toggle fullscreen button
    ***************************************/
	
     $('#toggle-fullscreen').button().click(function () {
        var button = $(this),
            root = document.documentElement;
        if (!button.hasClass('active')) {
            $('#modal-gallery').addClass('modal-fullscreen');
            if (root.webkitRequestFullScreen) {
                root.webkitRequestFullScreen(
                    window.Element.ALLOW_KEYBOARD_INPUT
                );
            } else if (root.mozRequestFullScreen) {
                root.mozRequestFullScreen();
            }
        } else {
            $('#modal-gallery').removeClass('modal-fullscreen');
            (document.webkitCancelFullScreen ||
                document.mozCancelFullScreen ||
                $.noop).apply(document);
        }
    });
	
	
	
	
	
	

	/***************************************
	 Image Cropping
    ***************************************/
	

	$('#demo-crop').imgAreaSelect({ 
		handles: true,
		fadeSpeed: 200,
		onSelectChange: preview });

 
	/*Preview Crop*/
	function preview(img, selection) {
    if (!selection.width || !selection.height)
        return;
    
    var scaleX = 100 / selection.width;
    var scaleY = 100 / selection.height;

    $('#preview img').css({
        width: Math.round(scaleX * 300),
        height: Math.round(scaleY * 300),
        marginLeft: -Math.round(scaleX * selection.x1),
        marginTop: -Math.round(scaleY * selection.y1)
    });

    $('#x1').val(selection.x1);
    $('#y1').val(selection.y1);
    $('#x2').val(selection.x2);
    $('#y2').val(selection.y2);
    $('#w').val(selection.width);
    $('#h').val(selection.height);    
	}

	
	
	
});


