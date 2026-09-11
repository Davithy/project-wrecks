Fancybox.bind("[data-fancybox]", {
})

const url = "http://localhost:3000/submission";
const scQuery = window.matchMedia("(min-width: 1201px)");

async function dataFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
            // console.log(data[0].submitter);
            // console.log(data[0].profiles);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('ERROR: ', error);
    }
};


async function tableBuilder() {
    const resultTable = document.querySelector('#final-results');

    const resultData = await dataFetch();
    const submissions = resultData;
    // console.log(submissions[0].profiles);

    const resultTypes = ["","Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy", "Unsure"]; //columns
    const resultNames = (submissions[0].profiles.map(profile => profile.name)); //rows

    // console.log(resultTypes);
    // console.log(resultNames);
    // console.log(resultValues);

    const resultCount = typeCounter(submissions, resultNames, resultTypes);
    const maxNum = calcMax(resultCount);

    // console.log(count);

    // TYPES
    const table = document.createElement('table');
        table.classList.add("dataTable");

    const typeRow = document.createElement('tr');
        typeRow.classList.add("typeRow");
    resultTypes.forEach(type => {
        const typeHeader = document.createElement('th');
            typeHeader.classList.add("typeHeader");
            
        if (scQuery.matches) {
            typeHeader.appendChild(document.createTextNode(type));
        } else {
            const typeLabel = document.createElement('label');
                typeLabel.classList.add("typeLabel");
            const typeImg = document.createElement('img');
                typeImg.classList.add("typeImg")
            const typeImages = "../assets/icons/" + type.toLowerCase() + ".svg";
            const unsureImage = "../assets/question.svg";
            if (type == "Unsure") {
                typeImg.src = unsureImage;
                typeLabel.appendChild(typeImg);
            }
            if (type !== "" && type !== "Unsure") { 
                typeImg.src = typeImages;
                typeLabel.appendChild(typeImg);
            }
            typeHeader.appendChild(typeLabel);
        }
        typeRow.appendChild(typeHeader);
    });
    table.appendChild(typeRow);

    // NAMES
    resultNames.forEach(name => {
        const nameRow = document.createElement('tr');
            nameRow.classList.add("nameRow");
        const nameHeader = document.createElement('th');
            nameHeader.classList.add("nameHeader");
        nameHeader.appendChild(document.createTextNode(name));
        nameRow.appendChild(nameHeader);

        resultTypes.forEach(type => {
            if (type !== "") {
                const typeData = document.createElement('td');
                    typeData.classList.add("typeData");
                const dataLabel = document.createElement('label');
                    dataLabel.classList.add("dataLabel");
                const value = resultCount[name][type];
                dataLabel.textContent = value;
                boxColor(value, maxNum, dataLabel);
                typeData.appendChild(dataLabel);
                nameRow.appendChild(typeData);
            }
        })
        table.appendChild(nameRow);
    });
    resultTable.appendChild(table);   

    // console.log(maxNum);
}


function typeCounter(submissions, names, types) {
    const typeCount = {};

    names.forEach(name => {
        typeCount[name] = {};
        types.forEach(type => {
            if (type !== "") {
                typeCount[name][type] = 0;
            };
        });
    });

    submissions.forEach(submission => {
        submission.profiles.forEach((profile, index) => {
            const name = names[index];
            // console.log(name);
            profile.types.forEach(typeVal => {
                const type = typeVal.charAt(0).toUpperCase() + typeVal.slice(1);
                // console.log(typeCount[name]);
                if (typeCount[name] && typeCount[name][type] !== undefined) {
                    typeCount[name][type]++;
                }
            });
        });
    });

    return typeCount;
}

function calcMax(resultCount) {
    let maxValue = 0;
    Object.values(resultCount).forEach(name => {
        Object.values(name).forEach(typeValue =>{
            if (typeValue > maxValue) {
                maxValue = typeValue;
            }
        })
    });
    return maxValue;
}

function boxColor(value, maxValue, dataLabel) {
    let processedCount = 0;
    if (maxValue !== undefined) {
        processedCount = (value/maxValue);
    }
    dataLabel.style.backgroundColor = `hsla(353, 86%, 54%, ${processedCount})`;
}

tableBuilder();