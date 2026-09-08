// Submission includes all choiceProfiles. if 1 choiceProfile has no type, it is not considered "complete".

// total global vars
let activeIndex = 0;
const submitBtn = document.querySelector(".submission-btn");


// name dropdown vars
const nameMenu = document.querySelector('.name-menu');
const navCheck = document.querySelector('#nav-check');
const nameBtn = nameMenu.querySelector('#name-toggle span');
const namePnl = nameMenu.querySelector('.name-pnl');
const optionList = namePnl.querySelectorAll('.name-opt');
const completionState = nameMenu.querySelector('.name-opt img');
const options = namePnl.querySelectorAll('.name-opt h3');
const optionsArr = Array.from(options);
const scQuery = window.matchMedia("(min-width: 1101px)");

// checkbox grid vars
const typeChoice = document.querySelectorAll('.choice .choice-checker');
const clearChoice = document.querySelector('.clear-all .choice-checker');

const choiceProfile = optionsArr.map((option, index) => ({
    id: index,
    name: option.textContent.trim(),
    types: [],
    complete: false
}));

// Disables checkboxes
function indexCheck() {
    if (activeIndex == 0) { 
        typeChoice.forEach(choice => {
            choice.disabled = true;
        })
    } else {
        typeChoice.forEach(choice => {
            choice.disabled = false;
        })
    } 
}

// Changes status from incomplete = complete
function progressStatus() {
    const progress = document.querySelectorAll('.progress');
    if (choiceProfile[activeIndex].complete) {
        progress[activeIndex].src = 'assets/tick-circle.png';
    } else {
        progress[activeIndex].src = 'assets/x-circle.png';
    }
}

// Loads checkboxes depending on chosen name
function profileLoadout() {
    typeChoice.forEach(cbRecall => {
        cbRecall.checked = choiceProfile[activeIndex].types.includes(cbRecall.dataset.type);
    });
}

// Clears all options
function clearAll() {
    typeChoice.forEach(checkbox => {
        checkbox.checked = false;
        choiceProfile[activeIndex].complete = false;
        choiceProfile[activeIndex].types = [];
        progressStatus();
    });
// Testing purposes --console.log("working on it.")
}

function formSubmit() {
    if (choiceProfile.forEach.complete) {
        console.log(choiceProfile[1]);
    } else {
        window.alert("Some folks are still missing a type!")
    }
}

// DROPDOWN NAME PICKER CODE
optionList.forEach((li, index) => {
    li.addEventListener("click", function() {
        optionList.forEach(name => name.classList.remove('selected'));
        li.classList.add('selected');
        nameBtn.textContent = li.textContent.trim();
        if (!scQuery.matches) {
            navCheck.checked = false;
        }
        activeIndex = index;
        indexCheck();
        profileLoadout();
    });
});

// POKEMON TYPE PICKER CODE
typeChoice.forEach(checkbox => {
    checkbox.addEventListener("click", function() {
        const pkmnType = checkbox.dataset.type;
        const nameChoImg = optionList[activeIndex].querySelector('.chosen-types');

        if (pkmnType == "Clear All") { nameChoImg.innerHTML = ''; return };

        if (checkbox.checked) {
            // Testing purposes --console.log(pkmnType);
            choiceProfile[activeIndex].types.push(pkmnType);
            const sourceImg = checkbox.nextElementSibling.querySelector('.choice-icon img');
            const imgClone = sourceImg.cloneNode();
            imgClone.dataset.type = pkmnType;
            nameChoImg.appendChild(imgClone);
        } else {
            choiceProfile[activeIndex].types = choiceProfile[activeIndex].types.filter((unchecked) => unchecked !== pkmnType);

            const imgRemove = nameChoImg.querySelector('[data-type="'+ pkmnType + '"]');
            if (imgRemove) imgRemove.remove();
            
            // Testing purposes --console.log(choiceProfile[activeIndex].types);
        }
        choiceProfile[activeIndex].complete = Array.from(typeChoice).some(cbox => cbox.checked);
        // Testing purposes --console.log(choiceProfile[activeIndex]);
        progressStatus();
    })
});

// CLEAR ALL OPTIONS CODE
clearChoice.addEventListener("click", function() {
    if (clearChoice.checked) {
        clearAll();
    }
});

navCheck.checked = false;
clearAll();
indexCheck();

submitBtn.onclick = formSubmit;