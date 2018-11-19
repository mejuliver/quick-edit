var $ce = new contentEditor();


function contentEditor(options){


	this.options = ( typeof options != typeof undefined || options != null ) ? options : {  edit_icon : '<i class="far fa-edit"></i>', template : false, delete_icon : '<i class="far fa-trash-alt"></i>' };


	this.init = function(){


		var $els = document.querySelectorAll('.ce-editor');


		for( var $i = 0; $i < $els.length; $i++ ){

			var $ce = document.createElement('div');
			$ce.classList.add('ce-editor-toolbox');
			$ce.innerHTML = '<button class="ce-btn ce-btn-edit" title="Edit">'+this.options.edit_icon+'</button><button class="ce-btn ce-btn-delete" title="Delete">'+this.options.delete_icon+'</button>';

			// create the form element
			var $form = document.createElement('form');
			$form.setAttribute( 'action', $els[$i].getAttribute('data-endpoint') );
			$form.setAttribute( 'method', 'post');
			$form.classList.add('ce-editor-form');
			switch( $els[$i].getAttribute('data-type') ){
				case 'textarea' :
					$form.innerHTML = '<div class="ce-editor-form-wrapper"><textarea class="ce-editor-form-textarea" row="3" name="'+$els[$i].getAttribute('data-name')+'">'+$els[$i].textContent+'</textarea><div class="ce-editor-form-btns-holder"><button class="ce-editor-form-submit">Submit</button><button class="ce-editor-form-cancel">Cancel</button></div></div>';
					break;
				default :
					$form.innerHTML = '<div class="ce-editor-form-wrapper"><input class="ce-editor-form-input" type="input" name="'+$els[$i].getAttribute('data-name')+'" value="'+$els[$i].textContent+'"><div class="ce-editor-form-btns-holder"><button class="ce-editor-form-submit">Submit</button><button class="ce-editor-form-cancel">Cancel</button></div></div>';
					
			}	

			$els[$i].appendChild($ce);
			$els[$i].appendChild($form);

			$els[$i].addEventListener('mouseover',function(){
				if( !this.classList.contains('active') ){
					this.querySelector('.ce-editor-toolbox').style.display = 'block';
				}
			});

			$els[$i].addEventListener('mouseout',function(){
				if( !this.classList.contains('active') ){
					this.querySelector('.ce-editor-toolbox').style.display = 'none';
				}
			});

			$els[$i].querySelector('.ce-btn-edit').addEventListener('click',function(){
				
				if( !this.closest('.ce-editor').classList.contains('active') ){
					// remove all active toolbox
					if( document.querySelector('.ce-editor.active') != null ){
						document.querySelector('.ce-editor.active .ce-editor-toolbox').style.display = 'none';
						document.querySelector('.ce-editor.active').classList.remove('active');	
					}
					
									
					this.closest('.ce-editor').querySelector('.ce-editor-form').style.display = 'block';
				}
							
			});


			$els[$i].querySelector('.ce-btn-delete').addEventListener('click',function(){
				
			});

			$els[$i].querySelector('.ce-editor-form-cancel').addEventListener('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				if( this.closest('.ce-editor').classList.contains('active') ){
					this.closest('.ce-editor-form').style.display = 'none';
					this.closest('.ce-editor').classList.remove('active');					
					this.closest('.ce-editor').querySelector('.ce-editor-toolbox').style.display = 'none';
				}
			});

			$els[$i].querySelector('.ce-editor-form').addEventListener('submit',function(e){
				e.preventDefault();
				this.querySelector('.ce-editor-form-wrapper').style.opacity = '.5';
				this.querySelector('.ce-editor-form-submit').textContent = 'Saving...';

				this.querySelector('.ce-editor-form-submit').disabled = true;
				this.querySelector('.ce-editor-form-cancel').disabled = true;
				if( this.querySelector('input') != null ){
					this.querySelector('input').disabled = true;	
				}
				if( this.querySelector('textarea') != null ){
					this.querySelector('textarea').disabled = true;
				}

				var $address = this.getAttribute('action');
				var $method = this.getAttribute('method');

				// send the data
				this.sendData()
			});

		}


	}

	this.sendData = function($address,$data,$method){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		       // Typical action to be performed when the document is ready:
		      return xhttp.responseText;
		    }
		};
		xhttp.open($method,$address,true);
		xhttp.send($data);
	}

	this.init();
}