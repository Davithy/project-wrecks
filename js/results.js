Fancybox.bind("[data-fancybox]", {
})

const url = "http://localhost:3000/submission";

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

async function valueFormatter() {
    const resultTable = document.querySelector('.results-table');

    const resultData = await dataFetch();
    const submissions = resultData;
    const resultTypes = ["","Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy", "Unsure"]; //columns
    const resultNames = (submissions[0].profiles.map(profile => profile.name)); //rows

    const tester = typeCounter(submissions, resultNames, resultTypes);
    console.log(tester);

    const profiles = submissions.flatMap(e => e.profiles);

    tableBuilder(tester);
}

function typeCounter(submissions, names, types) {
    const count = {};

    names.forEach(name => {
        count[name] = {};
        types.forEach(type => {
            count[name][type] = 0;
        });
    });

    submissions.forEach(submission => {
        submission.profiles.forEach((profile, index) => {
            const name = names[index];
            // console.log(name);
            profile.types.forEach(typeVal => {
                const type = typeVal.charAt(0).toUpperCase() + typeVal.slice(1);
                if (count[name] && count[name][type] !== undefined) {
                    count[name][type]++;
                }
            });
        });
    });

    return count;
}

function tableBuilder(submissions) {
    var table = new Tabulator("#final-results", {
        height: "50vh",
        placeholder: "Loading...",
        data: submissions,
        autoColumns: true,
        rowHeader:{field:"name", frozen: true},
    });
}

valueFormatter();

// BEFORE USING TABULATOR

// async function tableBuilder() {
//     const resultTable = document.querySelector('.results-table');

//     const resultData = await dataFetch();
//     const submissions = resultData;
//     // console.log(submissions[0].profiles);

//     const resultTypes = ["","Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy", "Unsure"]; //columns
//     const resultNames = (submissions[0].profiles.map(profile => profile.name)); //rows

//     // console.log(resultTypes);
//     // console.log(resultNames);
//     // console.log(resultValues);

//     const count = typeCounter(submissions, resultNames, resultTypes);

//     console.log(count);

//     // TYPES
//     const table = document.createElement('table');
//     table.setAttribute('border', '1');

//     const typeRow = document.createElement('tr');
//     resultTypes.forEach(type => {
//         const th = document.createElement('th');
//         th.appendChild(document.createTextNode(type));
//         typeRow.appendChild(th);
//     });
//     table.appendChild(typeRow);

//     // NAMES
//     resultNames.forEach(name => {
//         const row = document.createElement('tr');
//         const th = document.createElement('th');
//         th.appendChild(document.createTextNode(name));
//         row.appendChild(th);

//         resultTypes.forEach(type => {
//             if (type === "") return;
//             const td = document.createElement('td');
//             const value = count[name][type];
//             td.textContent = value;
//             row.appendChild(td);
//         })

//         table.appendChild(row);
//     });
//     resultTable.appendChild(table);
    
// }

// function typeCounter(submissions, names, types) {
//     const count = {};

//     names.forEach(name => {
//         count[name] = {};
//         types.forEach(type => {
//             count[name][type] = 0;
//         });
//     });

//     submissions.forEach(submission => {
//         submission.profiles.forEach((profile, index) => {
//             const name = names[index];
//             console.log(name);
//             profile.types.forEach(typeVal => {
//                 const type = typeVal.charAt(0).toUpperCase() + typeVal.slice(1);
//                 if (count[name] && count[name][type] !== undefined) {
//                     count[name][type]++;
//                 }
//             });
//         });
//     });

//     return count;
// }


// tableBuilder();

