document.addEventListener('DOMContentLoaded', function () {
	const modal = document.querySelector('.modal-backdrop');
	const modalContent = modal.querySelector('.modal-content');
	const openBtns = document.querySelectorAll('.hero__info-wrapper-btn');
	const closeElements = modal.querySelectorAll('[data-modal-close]');
	const form = document.querySelector('.form');
	const nameInput = document.getElementById('name');
	const phoneInput = document.getElementById('phone');
	const alertBox = document.querySelector('.form-alert');
	const submitBtn = form.querySelector('.form-button');

	// === Modal ochish/yopish ===
	openBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			modal.classList.add('modal-backdrop--open');
			document.body.style.overflow = 'hidden';
		});
	});

	function closeModal() {
		modal.classList.remove('modal-backdrop--open');
		document.body.style.overflow = '';
		form.reset();
		phoneInput.value = '+998 ';
		alertBox.classList.remove('open');
		alertBox.textContent = '';
		submitBtn.textContent = 'YUBORISH';
		submitBtn.disabled = false;
		submitBtn.style.background = '#f5cb72'; // asl rang
	}

	closeElements.forEach(el => el.addEventListener('click', closeModal));
	modal.addEventListener('click', closeModal);
	modalContent.addEventListener('click', e => e.stopPropagation());
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeModal();
	});

	// === Telefon raqami formatlash ===
	phoneInput.value = '+998 ';

	phoneInput.addEventListener('input', function () {
		let raw = phoneInput.value.replace(/\D/g, '');
		if (!raw.startsWith('998')) raw = '998' + raw;
		let rest = raw.slice(3);

		let formatted = '+998';
		if (rest.length > 0) formatted += ' (' + rest.slice(0, 2);
		if (rest.length >= 2) formatted += ') ' + rest.slice(2, 5);
		if (rest.length >= 5) formatted += '-' + rest.slice(5, 7);
		if (rest.length >= 7) formatted += '-' + rest.slice(7, 9);

		phoneInput.value = formatted;

		// Kursorni +998 dan oldinga qo‘ymaslik
		if (phoneInput.selectionStart < 5) {
			phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
		}
	});

	phoneInput.addEventListener('keydown', function (e) {
		const cursorPos = phoneInput.selectionStart;

		// +998 oldidan o‘chirishga ruxsat berilmaydi
		if (cursorPos <= 5 && (e.key === 'Backspace' || e.key === 'Delete')) {
			e.preventDefault();
			return;
		}

		// Belgilar ustida bo‘lsa ( ) - — kursorni siljitish
		const formatChars = ['(', ')', '-', ' '];
		const prevChar = phoneInput.value[cursorPos - 1];
		if (e.key === 'Backspace' && formatChars.includes(prevChar)) {
			e.preventDefault();
			const newPos = cursorPos - 1;
			phoneInput.setSelectionRange(newPos, newPos);
		}
	});

	// === Formani yuborish ===
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const nameVal = nameInput.value.trim();
		const phoneVal = phoneInput.value.trim();

		if (!nameVal) {
			alertBox.textContent = 'Ismingizni kiriting';
			alertBox.classList.add('open');
			return;
		}
		if (phoneVal.length < 19) {
			alertBox.textContent = 'Telefon raqamingizni kiriting';
			alertBox.classList.add('open');
			return;
		}

		alertBox.classList.remove('open');
		submitBtn.textContent = 'YUBORILMOQDA...';
		submitBtn.disabled = true;
		submitBtn.style.background = 'lightgrey';

		setTimeout(() => {
			window.location.href = 'obuna.html';
		}, 2000);
	});
});
