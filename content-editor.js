var $ce = new contentEditor();


function contentEditor(options){


	this.options = ( typeof options != typeof undefined || options != null ) ? true :  false;
	this.edit_icon = ( options && typeof options.edit_endpoint != typeof undefined ) ? options.edit_endpoint : '<i class="far fa-edit"></i>';
	this.delete_icon = ( options && typeof options.delete_endpoint != typeof undefined ) ? options.delete_endpoint : '<i class="far fa-trash-alt"></i>';
	this.add_icon = ( options && typeof options.add_icon != typeof undefined ) ? options.add_icon : '';

	this.add_endpoint = ( options && typeof options.add_endpoint != typeof undefined ) ? options.add_endpoint : '';
	this.update_endpoint = ( options && typeof options.update_endpoint != typeof undefined ) ? options.update_endpoint : '';
	this.delete_endpoint = ( options && typeof options.delete_endpoint != typeof undefined ) ? options.delete_endpoint : '';
	this.form_update_method = ( options && typeof options.form_update_method != typeof undefined ) ? options.form_update_method : 'post';
	this.form_delete_method = ( options && typeof options.form_delete_method != typeof undefined ) ? options.form_delete_method : 'post';
	this.form_add_classes = ( options && typeof options.form_add_classes != typeof undefined ) ? options.form_add_classes : false;
	this.form_update_classes = ( options && typeof options.form_update_classes != typeof undefined ) ? options.form_update_classes : false;
	this.form_delete_classes = ( options && typeof options.form_delete_classes != typeof undefined ) ? options.form_delete_classes : false;
	this.form_global_classes = ( options && typeof options.form_global_classes != typeof undefined ) ? options.form_global_classes : false;


	this.init = function(){

		var $els = document.querySelectorAll('.ce-editor');

		for( var $i = 0; $i < $els.length; $i++ ){

			var $ce = document.createElement('div');
			$ce.classList.add('ce-editor-toolbox');
			$ce.innerHTML = '<button class="ce-btn ce-btn-edit" title="Edit">'+this.edit_icon+'</button><button class="ce-btn ce-btn-delete" title="Delete">'+this.delete_icon+'</button>';

			// create the form element
			var $form = document.createElement('form');
			$form.setAttribute( 'action', this.update_endpoint );
			$form.setAttribute( 'method', this.form_update_method );
			$form.classList.add( 'ce-editor-form','update' );
			if ( this.form_global_classes ){
				$form.classList.add( this.form_global_classes );	
			}
			if ( this.form_update_classes ){
				$form.classList.add( this.form_update_classes );
			}
			
			switch( $els[$i].getAttribute('data-type') ){
				case 'textarea' :
					$form.innerHTML = '<div class="ce-editor-form-wrapper"><textarea class="ce-editor-form-textarea" row="3" name="'+$els[$i].getAttribute('data-name')+'">'+$els[$i].textContent+'</textarea><div class="ce-editor-form-btns-holder"><button class="ce-editor-form-submit">Submit</button><button class="ce-editor-form-cancel">Cancel</button></div></div>';
					break;
				default :
					$form.innerHTML = '<div class="ce-editor-form-wrapper"><input class="ce-editor-form-input" type="input" name="'+$els[$i].getAttribute('data-name')+'" value="'+$els[$i].textContent+'"><div class="ce-editor-form-btns-holder"><button class="ce-editor-form-submit">Submit</button><button class="ce-editor-form-cancel">Cancel</button></div></div>';
			}

			$els[$i].appendChild( $ce );
			$els[$i].appendChild( $form );

			// create the form element
			var $form = document.createElement('form');
			$form.setAttribute( 'action', this.update_endpoint );
			$form.setAttribute( 'method', this.form_delete_method );
			$form.classList.add( 'ce-editor-form','delete' );
			if ( this.form_global_classes ){
				$form.classList.add( this.form_global_classes );
			}
			if ( this.form_delete_classes ){
				$form.classList.add( this.form_delete_classes );
			}

			$form.innerHTML = '<div class="ce-editor-form-wrapper"><div style="color: red;font-size:14px;font-weight:normal;line-height:initial;">Are you sure you want to delete?</div><input class="ce-editor-form-input" type="hidden" name="'+$els[$i].getAttribute('data-name')+'" value="'+$els[$i].getAttribute('data-id')+'"><div class="ce-editor-form-btns-holder"><button class="ce-editor-form-submit">Submit</button><button class="ce-editor-form-cancel">Cancel</button></div></div>';
			$els[$i].appendChild( $form );

			$els[$i].addEventListener('mouseover',function(){
				if( !this.classList.contains('active') ){
					this.querySelector('.ce-editor-toolbox').style.display = 'block';
				}else{
					this.querySelector('.ce-editor-toolbox').style.display = 'none';
				}
			});

			$els[$i].addEventListener('mouseout',function(){
				if( !this.classList.contains('active') ){
					this.querySelector('.ce-editor-toolbox').style.display = 'none';
				}
			});

			$els[$i].querySelector('.ce-btn-edit').addEventListener('click',function(){				
				
				// remove all active toolbox
				if( document.querySelector('.ce-editor.active') != null ){
					document.querySelector('.ce-editor.active .ce-editor-form.update').style.display = 'none';
					document.querySelector('.ce-editor.active .ce-editor-form.delete').style.display = 'none';
					document.querySelector('.ce-editor.active').classList.remove('active');
				}

				this.closest('.ce-editor').classList.add('active');
				this.closest('.ce-editor').querySelector('.ce-editor-form.update').style.display = 'block';
				
			});


			$els[$i].querySelector('.ce-btn-delete').addEventListener('click',function(){
				// remove all active toolbox
				if( document.querySelector('.ce-editor.active') != null ){
					document.querySelector('.ce-editor.active .ce-editor-form.update').style.display = 'none';
					document.querySelector('.ce-editor.active .ce-editor-form.delete').style.display = 'none';
					document.querySelector('.ce-editor.active').classList.remove('active');
				}

				this.closest('.ce-editor').classList.add('active');
				this.closest('.ce-editor').querySelector('.ce-editor-form.delete').style.display = 'block';
			});

			$els[$i].querySelector('.ce-editor-form-cancel').addEventListener('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				if( this.closest('.ce-editor').classList.contains('active') ){
					this.closest('.ce-editor-form.update').style.display = 'none';
					this.closest('.ce-editor-form.delete').style.display = 'none';
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