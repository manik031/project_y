// Show Images on Image Button
const profileUploaderBtn = document.querySelector(".profile_uploader-btn");
const profiteInputButton = document.querySelector(".profile_input-button");
const profileImage = document.querySelector(".profile_image");

profileUploaderBtn.addEventListener("click", () => {
    profiteInputButton.click();
});

profiteInputButton.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            profileImage.src = result;
        };
        reader.readAsDataURL(file);
    }
});

// validation
let select_scene = document.getElementById("select_scene");
let user_name = document.getElementById("name");
let surname = document.getElementById("surname");
let age = document.getElementById("age");
let city = document.getElementById("city");
let email = document.getElementById("email");
let checkbox = document.getElementById("validationFormCheck1");

let pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
let mailformat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function form_validate() {
    var flag = validate();
    if (flag) {
        generateImage();
    }
}

//Live form validation
user_name.addEventListener("keyup", function (e) {
    if (user_name.value.match(pattern) || user_name.value.length != 0) {
        user_name.style.border = "3px solid #14A44D";
    } else {
        user_name.style.border = "3px solid #DC4C64";
    }
});

surname.addEventListener("keyup", function (e) {
    if (surname.value.match(pattern) || surname.value.length != 0) {
        surname.style.border = "3px solid #14A44D";
    } else {
        surname.style.border = "3px solid #DC4C64";
    }
});

age.addEventListener("keyup", function (e) {
    if ((age.value > 0 && age.value < 70) || age.value.length != 0) {
        age.style.border = "3px solid #14A44D";
    } else {
        age.style.border = "3px solid #DC4C64";
    }
});

city.addEventListener("keyup", function (e) {
    if (city.value.match(pattern) || age.value.length != 0) {
        city.style.border = "3px solid #14A44D";
    } else {
        city.style.border = "3px solid #DC4C64";
    }
});

email.addEventListener("keyup", function (e) {
    if (mailformat.test(email.value) || email.value.length != 0) {
        email.style.border = "3px solid #14A44D";
    } else {
        email.style.border = "3px solid #DC4C64";
    }
});

checkbox.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        document.getElementById("checkbox_label").style.color = "#14A44D";
    } else {
        document.getElementById("checkbox_label").style.color = "#DC4C64";
    }
});

select_scene.addEventListener("change", (event) => {
    if (select_scene.value != '') {
        select_scene.style.border = "3px solid #14A44D";
    } else {
        select_scene.style.border = "3px solid #DC4C64";
    }
});

// Form validation
function validate() {
    var status = true;
    var inputImage = document.getElementById("image");
    var files = inputImage.files;

    if (files.length === 0) {
        alert("Please choose a file first...");
        status= false;
    }

    if (select_scene.value === '') {
        select_scene.style.border = "3px solid #DC4C64";
        status = false;
    }

    if (!pattern.test(user_name.value)) {
        user_name.style.border = "3px solid #DC4C64";
        status = false;
    } 
    if (!pattern.test(surname.value)) {
        surname.style.border = "3px solid #DC4C64";
        status = false;
    } 
    if (age.value <= 0 || age.value >= 70) {
        age.style.border = "3px solid #DC4C64";
        status = false;
    } 
    if (!pattern.test(city.value)) {
        city.style.border = "3px solid #DC4C64";
        status = false;
    }
    if (!mailformat.test(email.value) ) {
        email.style.border = "3px solid #DC4C64";
        status = false;
    } 
    if (!document.getElementById("validationFormCheck1").checked) {
        document.getElementById("checkbox_label").style.color = "#DC4C64";
        status = false;
    }
    return status;
}

const loginPopup = document.querySelector(".popup");
const close = document.querySelector(".close");
var loading = document.getElementById("loading");
var display_error = document.getElementById("display_error");
var generats = document.getElementById("generats");
var ok_button = document.getElementById("ok_button");
// Close the popup
close.addEventListener("click", function () {
    loginPopup.classList.remove("show");
    location.reload();
});

ok_button.addEventListener("click", function () {
    loginPopup.classList.remove("show");
    location.reload();
});

function generateImage() {
    // Get the input image file
    var gender = document.querySelector('input[name="gender"]:checked');

    var inputImage = document.getElementById("image").files[0];
    const profileImage = document.querySelector(".profile_image");

    // Set the image button icon on upload image area.
    profileImage.src = "/static/public/Upload Button.png";

    // Show the Popup
    loginPopup.classList.add("show");
    display_error.style.display = "none";
    // Create a FormData object to send the image to the server
    var formData = new FormData();
    formData.append("image", inputImage);
    
    formData.append("name", user_name.value);
    formData.append("surname", surname.value);
    formData.append("age", age.value);
    formData.append("city", city.value);
    formData.append("email", email.value);
    formData.append("gender", gender.value);

    formData.append("select_scene", select_scene.value);

    // Send the image to the server for generation

    fetch("/generate", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then(data => {
            // Remove loading indicator
            loading.style.display = "none";
    
            // Display the generated images
            var generatedImagesElement_1 = document.getElementById("generate_img_1");
            generatedImagesElement_1.innerHTML = "";

            if (data && data.success && data.data !== null) {
                generats.style.display = "block";
    
                // Create image elements
                var imageElement_1 = createImageElement("data:image/png;base64," + data.data[0]);
    
                // Store image URLs
                window.img1 = imageElement_1.src;
    
                window.img1_url = data.data[1];
    
                // Append image elements to the DOM
                generatedImagesElement_1.appendChild(imageElement_1);
            } else {
                // Display error message
                display_error.style.display = "block";
                var errorMessage = document.createElement("p");
                errorMessage.textContent = data ? data.error : "Unexpected end of JSON input";
                console.error(errorMessage);
            }
        })
        .catch((error) =>{
            // disappeared loading indicator
            loading.style.display = "none";
            display_error.style.display = "block";
            console.error("Error:", error);
        });
    
    // Reset form data
    document.getElementById("generate_form").reset();
}

// Function to create an image element
function createImageElement(src) {
    var imageElement = document.createElement("img");
    imageElement.src = src;
    imageElement.style.width = "170px";
    imageElement.style.height = "185px";
    imageElement.classList.add("img-fluid");
    return imageElement;
}

function downloadImage() {
    // Base64-encoded image string
    var base64Image = img1; 

    // Create a link element
    var downloadLink = document.createElement("a");

    // Set the href attribute with the Base64 image string
    downloadLink.href = base64Image;

    // Set the download attribute with the desired filename
    downloadLink.download = "image.png";

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
}

// Share images
const shareButton = document.getElementById('shareButton');
    // Add click event listener to the share button
    shareButton.addEventListener('click', async () => {
        try {
            // Check if the navigator supports the Share API
            if (navigator.share) {
                // Use the Share API to trigger the native sharing dialog
                await navigator.share({
                    title: 'Share Image',
                    text: 'Check out this generated image!',
                    url: img1_url
                });
            } else {
                // Fallback for browsers that do not support the Share API
                alert('Sorry, your browser does not support the Share API.');
            }
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    });

// Share Popup 
// const section = document.querySelector(".share_popup"),
//     overlay = document.querySelector(".overlay"),
//     showBtn = document.querySelector(".show-modal");

// showBtn.addEventListener("click", () => section.classList.add("active"));

// overlay.addEventListener("click", () =>
//     section.classList.remove("active")
// );
