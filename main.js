const books = [
	{ title: 'Nhà giả kim', author: 'Paulo Coelho', price: 799000, category: 'van-hoc', cover: 'cover-1', label: 'THE\nALCHEMIST', image: 'https://covers.openlibrary.org/b/id/14846382-L.jpg?default=false' },
	{ title: 'Đi tìm lẽ sống', author: 'Viktor E. Frankl', price: 929000, category: 'ky-nang', cover: 'cover-2', label: 'MAN’S\nSEARCH' },
	{ title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', price: 868686, category: 'kinh-te', cover: 'cover-3', label: 'THINKING\nFAST & SLOW', image: 'https://covers.openlibrary.org/b/id/13290711-L.jpg?default=false' },
	{ title: 'Tuổi trẻ đáng giá bao nhiêu?', author: 'Rosie Nguyễn', price: 888000, category: 'ky-nang', cover: 'cover-4', label: 'TUỔI TRẺ\nĐÁNG GIÁ?' },
	{ title: 'Mắt biếc', author: 'Nguyễn Nhật Ánh', price: 1056000, category: 'van-hoc', cover: 'cover-5', label: 'MẮT\nBIẾC', image: 'https://covers.openlibrary.org/b/id/13258074-L.jpg?default=false' },
	{ title: 'Đắc nhân tâm', author: 'Dale Carnegie', price: 98000, category: 'ky-nang', cover: 'cover-2', label: 'ĐẮC NHÂN\nTÂM', image: 'https://covers.openlibrary.org/b/id/13314878-L.jpg?default=false' },
	{ title: 'Sapiens: Lược sử loài người', author: 'Yuval Noah Harari', price: 189000, category: 'kinh-te', cover: 'cover-3', label: 'SAPIENS', image: 'https://covers.openlibrary.org/b/id/8634250-L.jpg?default=false' },
	{ title: 'Dám bị ghét', author: 'Ichiro Kishimi, Fumitake Koga', price: 109000, category: 'ky-nang', cover: 'cover-4', label: 'DÁM BỊ GHÉT' },
	{ title: 'Người giàu có nhất thành Babylon', author: 'George S. Clason', price: 89000, category: 'kinh-te', cover: 'cover-1', label: 'NGƯỜI GIÀU\nBABYLON', image: 'https://covers.openlibrary.org/b/id/10491331-L.jpg?default=false' },
	{ title: 'Bố già', author: 'Mario Puzo', price: 159000, category: 'van-hoc', cover: 'cover-5', label: 'BỐ GIÀ', image: 'https://covers.openlibrary.org/b/id/6507069-L.jpg?default=false' },
	{ title: 'Cà phê cùng Tony', author: 'Tony Buổi Sáng', price: 90000, category: 'ky-nang', cover: 'cover-2', label: 'CÀ PHÊ\nCÙNG TONY', image: 'https://covers.openlibrary.org/b/id/9175811-L.jpg?default=false' },
	{ title: 'Nghĩ giàu và làm giàu', author: 'Napoleon Hill', price: 115000, category: 'kinh-te', cover: 'cover-3', label: 'NGHĨ GIÀU\nLÀM GIÀU', image: 'https://covers.openlibrary.org/b/id/14542536-L.jpg?default=false' },
	{ title: 'Hành trình về phương Đông', author: 'Baird T. Spalding', price: 99000, category: 'van-hoc', cover: 'cover-4', label: 'HÀNH TRÌNH\nPHƯƠNG ĐÔNG', image: 'https://covers.openlibrary.org/b/id/1626611-L.jpg?default=false' },
	{ title: 'Cho tôi xin một vé đi tuổi thơ', author: 'Nguyễn Nhật Ánh', price: 85000, category: 'van-hoc', cover: 'cover-5', label: 'VÉ ĐI\nTUỔI THƠ' },
	{ title: 'Không gia đình', author: 'Hector Malot', price: 145000, category: 'van-hoc', cover: 'cover-1', label: 'KHÔNG\nGIA ĐÌNH', image: 'https://covers.openlibrary.org/b/id/5754078-L.jpg?default=false' }
];

const state = { cart: [] };
const bookGrid = document.querySelector('#bookGrid');
const searchInput = document.querySelector('#searchInput');
const categoryFilter = document.querySelector('#categoryFilter');

function formatPrice(price) { return `${price.toLocaleString('vi-VN')} đ`; }

function renderBooks() {
	const query = searchInput.value.trim().toLowerCase();
	const category = categoryFilter.value;
	const visibleBooks = books.filter((book) => {
		const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(query);
		return matchesQuery && (category === 'all' || book.category === category);
	});
	bookGrid.innerHTML = visibleBooks.map((book) => `
		<article class="book-card">
			<div class="cover ${book.cover}${book.image ? ' has-image' : ''}">${book.image ? `<img class="cover-image" src="${book.image}" alt="Bìa sách ${book.title}" loading="lazy">` : ''}<span class="cover-label">${book.label.replace('\n', '<br>')}</span></div>
			<div class="book-info">
				<h3>${book.title}</h3><p class="author">${book.author}</p>
				<div class="book-bottom"><span class="price">${formatPrice(book.price)}</span><button class="add-button" data-title="${book.title}" type="button">Thêm vào giỏ</button></div>
			</div>
		</article>`).join('');
	removeFailedImages(bookGrid);
	document.querySelector('#emptyState').hidden = visibleBooks.length > 0;
	document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.title)));
}

function addToCart(title) {
	const book = books.find((item) => item.title === title);
	state.cart.push(book);
	renderCart();
}

function removeFromCart(index) {
	state.cart.splice(index, 1);
	renderCart();
}

function removeFailedImages(container) {
	container.querySelectorAll('img').forEach((image) => image.addEventListener('error', () => {
		image.parentElement.classList.remove('has-image');
		image.remove();
	}, { once: true }));
}

function renderCart() {
	document.querySelector('#cartCount').textContent = state.cart.length;
	const cartItems = document.querySelector('#cartItems');
	cartItems.innerHTML = state.cart.length ? state.cart.map((book, index) => `<div class="cart-item"><div class="mini-cover ${book.cover}">${book.image ? `<img src="${book.image}" alt="" loading="lazy">` : ''}</div><p>${book.title}</p><strong>${formatPrice(book.price)}</strong><button class="remove-button" data-cart-index="${index}" type="button" aria-label="Xóa ${book.title} khỏi giỏ hàng">Xóa</button></div>`).join('') : '<p class="cart-empty">Giỏ hàng đang trống.</p>';
	removeFailedImages(cartItems);
	document.querySelectorAll('.remove-button').forEach((button) => button.addEventListener('click', () => removeFromCart(Number(button.dataset.cartIndex))));
	const total = state.cart.reduce((sum, book) => sum + book.price, 0);
	document.querySelector('#cartTotal').textContent = formatPrice(total);
	document.querySelector('#paymentTotal').textContent = formatPrice(total);
	document.querySelector('#checkoutButton').disabled = state.cart.length === 0;
}

function toggleCart(open) {
	const cartPanel = document.querySelector('#cartPanel');
	cartPanel.classList.toggle('open', open);
	cartPanel.setAttribute('aria-hidden', String(!open));
	document.querySelector('#overlay').classList.toggle('visible', open);
}

searchInput.addEventListener('input', renderBooks);
categoryFilter.addEventListener('change', renderBooks);
document.querySelector('#cartButton').addEventListener('click', () => toggleCart(true));
document.querySelector('#closeCart').addEventListener('click', () => toggleCart(false));
document.querySelector('#overlay').addEventListener('click', () => toggleCart(false));
document.querySelector('#checkoutButton').addEventListener('click', () => document.querySelector('#paymentDialog').showModal());
document.querySelector('#closePayment').addEventListener('click', () => document.querySelector('#paymentDialog').close());
document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => {
	categoryFilter.value = button.dataset.category;
	renderBooks();
	document.querySelector('#books').scrollIntoView({ behavior: 'smooth' });
}));

renderBooks();
