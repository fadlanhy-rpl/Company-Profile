const toggleButton = document.getElementById('toggleButton');
const menu = document.getElementById('menu');
const backButton = document.getElementById('backButton');

// Function to open the navbar
toggleButton.addEventListener('click', () => {
 menu.classList.toggle('active');
 toggleButton.style.opacity = '0'; // Hide the small button when navbar expands
 setTimeout(() => {
     toggleButton.style.visibility = 'hidden';
 }, 500); // Ensure the small button hides smoothly
});

// Function to close the navbar using back button
backButton.addEventListener('click', () => {
 menu.classList.add('closing');
 setTimeout(() => {
     menu.classList.remove('active');
     menu.classList.remove('closing');
     toggleButton.style.visibility = 'visible';
     toggleButton.style.opacity = '1';
 }, 600); // Match this time with the CSS transition
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
 if (!toggleButton.contains(event.target) && !menu.contains(event.target)) {
     if (menu.classList.contains('active')) {
         menu.classList.add('closing');
         setTimeout(() => {
             menu.classList.remove('active');
             menu.classList.remove('closing');
             toggleButton.style.visibility = 'visible';
             toggleButton.style.opacity = '1';
         }, 600); // Close the menu if clicking outside
     }
 }
});


document.addEventListener("DOMContentLoaded", function () {
	let articles = document.querySelectorAll("article");
	let popup = document.getElementById("popup");
	let overlay = document.getElementById("overlay");
	let popupContent = document.getElementById("popup-content");

	articles.forEach(function (article) {
		article.addEventListener("click", function (event) {
			let blockquote = article.querySelector("blockquote[data-url]");
			if (blockquote) {
				window.open(blockquote.getAttribute("data-url"), "_blank");
				return;
			}

			let rect = article.getBoundingClientRect();
			let x = event.clientX - rect.left;
			let y = event.clientY - rect.top;

			let figcaption = article.querySelector("figcaption span:first-child");
			let figcaptionText = figcaption ? figcaption.textContent : ""; // check if figcaption is present
			let dateAndTimeText = article
				.querySelector(".date-and-time")
				.textContent.trim();
			let authorText = article
				.querySelector("figcaption span:last-child")
				.textContent.trim();

			let img = article.querySelector("img");
			let imgSrc = img ? img.getAttribute("src") : ""; // check if image is present
			let imgElement = imgSrc ? `<img src="${imgSrc}" alt="Popup Image">` : ""; // create img element if image is present

			popupContent.innerHTML = `
                ${imgElement}
                <div>${figcaptionText}</div>
                <div class="flex"><div class="dt-popup">${dateAndTimeText}</div><div>${authorText}</div></div>
                <p>Lorem ipsum dolor sit amet, nam sale civibus conclusionemque et, ad qui omnes audire eloquentiam, at vis lucilius expetenda. Est ad meis putant suscipiantur, cu vix vidisse pertinax, in sea exerci mandamus. Usu id iriure tritani, vel quis fierent abhorreant id. Pri ne minimum legendos, ius sale ornatus argumentum id. In ius tale dico debet, per regione nonumes in. At ius tollit laudem molestiae, dicam praesent quo an. His ex mentitum electram.</p>
            `;
			popup.style.top = rect.top + y + "px";
			popup.style.left = rect.left + x + "px";
			overlay.style.display = "block";
			popup.style.display = "block";

			setTimeout(() => {
				popup.style.top = "50%";
				popup.style.left = "50%";
			}, 10);
		});
	});

	overlay.addEventListener("click", function () {
		popup.style.display = "none";
		overlay.style.display = "none";
	});

	// Close button functionality
	document.getElementById("close-btn").addEventListener("click", function () {
		popup.style.display = "none";
		overlay.style.display = "none";
	});
});

// card
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress / 100 * ($items.length - 1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i / $items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()
}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)