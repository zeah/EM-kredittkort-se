(() => {

	// console.log(emkredittkortse_meta);

	let newtype = '';

	// meta box
	let container = document.querySelector('.emkredittkortse-meta-container');

	// new div helper function
	let newdiv = (o = {}) => {
		let div = document.createElement('div');

		if (o.class) {
			if (Array.isArray(o.class))
				for (let c of o.class)
					div.classList.add(c);
			else
				div.classList.add(o.class);
		}

		if (o.text) div.appendChild(document.createTextNode(o.text));

		return div;
	}

	// new input helper function
	let newinput = (o = {}) => {
		if (!o.name) return document.createElement('div');

		let container = newdiv({class: 'emkredittkortse-input-container'});

		let title = newdiv({class: 'emkredittkortse-input-title', text: o.title});
		container.appendChild(title);

		let input = document.createElement('input');

		if (!o.type) input.setAttribute('type', 'text');
		else input.setAttribute('type', o.type);

		if (o.type != 'checkbox') {
			if (!o.sort) input.setAttribute('value', (emkredittkortse_meta.meta[o.name] == undefined) ? '' : emkredittkortse_meta.meta[o.name]);
			else {
				let sort = emkredittkortse_meta.emkredittkortse_sort;

				if (o.sort != 'default') sort = emkredittkortse_meta['emkredittkortse_sort_'+o.sort];

				if (sort == undefined) sort = emkredittkortse_meta.emkredittkortse_sort;

				input.setAttribute('value', sort);
			}
		}
		else if (emkredittkortse_meta.meta[o.name]) input.setAttribute('checked', '');


		if (o.step) input.setAttribute('step', parseFloat(o.step));
		if (o.max) input.setAttribute('max', parseFloat(o.step));
		if (o.min) input.setAttribute('min', parseFloat(o.step));



		if (!o.notData) input.setAttribute('name', 'emkredittkortse_data['+o.name+']');
		else input.setAttribute('name', o.name);

		container.appendChild(input);


		return container;
	}

	// creating the drop down for dice selection
	let dicedropdown = (o = {}) => {
		let container = document.createElement('div');

		let input = document.createElement('select');
		input.setAttribute('name', 'emkredittkortse_data[terning]');

		container.appendChild(newdiv({class: 'emkredittkortse-input-title', text: 'Terningkast'}));

		// helper function for creating option tag
		let addOption = (o = {}) => {
			let option = document.createElement('option');
			option.setAttribute('value', o.value);
			if (o.value == emkredittkortse_meta.meta.terning) option.setAttribute('selected', '');
			option.appendChild(document.createTextNode(o.value));
			return option;
		}

		// adding option tags
		let v = ['ingen', 'en', 'to', 'tre', 'fire', 'fem', 'seks'];
		for (let i of v)
			input.appendChild(addOption({value: i}));

		// input.appendChild(addOption({value: 'ingen'}));
		// input.appendChild(addOption({value: 'en'}));
		// input.appendChild(addOption({value: 'to'}));
		// input.appendChild(addOption({value: 'tre'}));
		// input.appendChild(addOption({value: 'fire'}));
		// input.appendChild(addOption({value: 'fem'}));
		// input.appendChild(addOption({value: 'seks'}));

		container.appendChild(input);

		return container; 
	}

	let container_sort = newdiv({class: 'emkredittkortse-sort-container'});
	container_sort.appendChild(newinput({
		name: 'emkredittkortse_sort', 
		title: 'Sortering', 
		notData: true, 
		sort: 'default', 
		type: 'number',
		step: 0.01
	}));

	container.appendChild(container_sort);

	for (let sort of emkredittkortse_meta['tax'])
		container_sort.appendChild(newinput({
			name: 'emkredittkortse_sort_'+sort, 
			title: 'Sortering '+sort.replace(/-/g, ' '), 
			notData: true, 
			sort: sort, 
			type: 'number',
			step: 0.01
		}));

	container.appendChild(newinput({name: 'readmore', title: 'Read More Link'}));

	container.appendChild(newinput({name: 'bestill', title: 'Bestill Link'}));
	container.appendChild(newinput({name: 'bestill_text', title: 'Bestill Text (under bestillknapp)'}));
	container.appendChild(newinput({name: 'pixel', title: 'Tracking Pixel URL'}));
	container.appendChild(newinput({name: 'qstring', type: 'checkbox', title: 'Add query'}));

	let info_container = newdiv({class: 'emkredittkortse-info-container'});

	info_container.appendChild(newinput({name: 'info01', title: 'Text 01'}));
	info_container.appendChild(newinput({name: 'info05', title: 'Text 05'}));
	info_container.appendChild(newinput({name: 'info02', title: 'Text 02'}));
	info_container.appendChild(newinput({name: 'info06', title: 'Text 06'}));
	info_container.appendChild(newinput({name: 'info03', title: 'Text 03'}));
	info_container.appendChild(newinput({name: 'info07', title: 'Text 07'}));
	info_container.appendChild(newinput({name: 'info04', title: 'Text 04'}));
	info_container.appendChild(newinput({name: 'info08', title: 'Text 08'}));

	container.appendChild(info_container);

	container.appendChild(dicedropdown());


	// adding existing category
	jQuery('#emkredittkortsetypechecklist').on('change', function(e) {

		let text = $(e.target).parent().text().trim().replace(/ /g, '-');

		if (!e.target.checked) $("input[name='emkredittkortse_sort_"+text+"']").parent().remove();
		else {
			let input = newinput({
				name: 'emkredittkortse_sort_'+text, 
				title: 'Sortering '+text.replace(/-/g, ' '), 
				notData: true, 
				sort: text, 
				type: 'number',
				step: 0.01
			});

			// $("input[name='emkredittkortse_sort']").parent().parent().append(input);
			$('.emkredittkortse-sort-container').append(input);
		}
	});

	// reading name of new category for creating
	jQuery('#newemkredittkortsetype').on('input', function(e) { newtype = e.target.value; });

	// creating category
	jQuery('#emkredittkortsetype-add-submit').click(function(e) {
		let text = newtype.trim().replace(/ /g, '-');
		text = text.replace('ö', 'o');
		text = text.replace('ä', 'ae');
		text = text.replace('å', 'a');
		let input = newinput({name: 'emkredittkortse_sort_'+text, title: 'Sortering '+text.replace(/-/g, ' '), notData: true, sort: text, type: 'number'});
		$('.emkredittkortse-sort-container').append(input);
		// $("input[name='emkredittkortse_sort']").parent().parent().append(input);
	});

})();