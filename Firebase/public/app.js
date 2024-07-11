
const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');
const Userphoto = document.getElementById("Userphoto");

const provider = new firebase.auth.GoogleAuthProvider();
const presetMoP = [
    "Credit Cards",
    "Debit Cards",
    "E-Wallets",
    "Bank Transfers",
    "Mobile Payments",
    "Cryptocurrencies",
    "Prepaid Cards",
    "Cash",
    "Buy Now, Pay Later",
    "Checks",
    "Direct Debit",
    "Money Orders",
    "Wire Transfers",
    "Digital Currencies",
    "Others",
    "Add Custom",
];

const presetCategories = [
    "Food",
    "Shopping",
    "Housing",
    "Transportation",
    "Utilities",
    "Healthcare",
    "Insurance",
    "Entertainment",
    "Education",
    "Personal Care",
    "Clothing",
    "Savings",
    "Investments",
    "Travel",
    "Gifts and Donations",
    "Debt Repayment",
    "Subscriptions",
    "Taxes",
    "Pets",
    "Childcare",
    "Others",
    "Add Custom",
];

const dropdown1 = document.getElementById('categoryDropdown');
    presetCategories.forEach(Cat => {
        const option = document.createElement('option');
        option.value = Cat;
        option.textContent = Cat;
        dropdown1.appendChild(option);
    });

const dropdown2 = document.getElementById('MoPDropdown');
    presetMoP.forEach(MoP => {
        const option = document.createElement('option');
        option.value = MoP;
        option.textContent = MoP;
        dropdown2.appendChild(option);
    });

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        Userphoto.src = user.Userphoto;
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    } 
});
const CategoryItm = document.getElementById("Category");
const AmountItm = document.getElementById("Amount");
const db = firebase.firestore()
const sumbitBtn = document.getElementById("submit-btn");
const thingsList = document.getElementById("thingsList"); 

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    
    if (user) {

        
        thingsRef = db.collection('spendings')

        sumbitBtn.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            thingsRef.add({
                uid:user.uid,
                Amount:Number(AmountItm.value),
                Category:String(CategoryItm.value),
                Date: serverTimestamp()
            });
        }

        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            .orderBy('Date') 
            .onSnapshot(querySnapshot => {
                
                

                const items = querySnapshot.docs.map(doc => {

                    return `<li>Amount: ${doc.data().Amount}, Category: ${doc.data().Category}</li>`

                });

                thingsList.innerHTML = items.join('');
            });



    } else {
        
        unsubscribe && unsubscribe();
    }
});

// const modifyCategory = document.getElementById("modify-category");

// modifyCategory.onclick = () => {
//     whenSignedIn.hidden = true;
//     whenSignedOut.hidden = true;
//     modifyCategory.hidden = false;
// };

// CATEGORY DATA PUSH PULL AND HANDLING //


let thingsRef2;
let unsubscribe2;
const sumbitBtn2 = document.getElementById("submit-btn-Category")
const CategoryText = document.getElementById("add-category")
auth.onAuthStateChanged(user => {

    if (user) {

        
        thingsRef2 = db.collection('categories')

        sumbitBtn2.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;
            thingsRef2.add({
                uid:user.uid,
                Category:String(CategoryText.value),
                Date: serverTimestamp()
            });
            console.log("success")
        }

        unsubscribe2 = thingsRef2
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        
        let usersCat = querySnapshot.docs.map(doc => {                
            return doc.data().Category;
        }); 
        console.log(usersCat)
        addCategories(usersCat)
        console.log("pulling data sucessful")
    });

    


    } else {
        
        unsubscribe2 && unsubscribe();
    }
});





// MoP DATA PUSH PULL AND HANDLING //


let thingsRef3;
let unsubscribe3;
const sumbitBtn3 = document.getElementById("submit-btn-MoP");
const MoPText = document.getElementById("add-MoP");
const dropdownCAT = document.getElementById('categoryDropdown');
const dropdownMoP = document.getElementById('MoPDropdown');
const CustomCATAdd = document.getElementById("AddCustomSectionCAT");
const CustomMoPAdd = document.getElementById("AddCustomSectionMoP");

dropdownCAT.addEventListener('change', () => {
    if (dropdownCAT.value === 'Add Custom') {
        CustomCATAdd.hidden = false;
    } else {
        CustomCATAdd.hidden = true;
    }
});

dropdownMoP.addEventListener('change', () => {
    if (dropdownMoP.value === 'Add Custom') {
        CustomMoPAdd.hidden = false;
    } else {
        CustomMoPAdd.hidden = true;
    }
});



auth.onAuthStateChanged(user => {

    if (user) {

        
        thingsRef3 = db.collection('MoP')

        sumbitBtn3.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            thingsRef3.add({
                uid:user.uid,
                MoP:String(MoPText.value),
                Date: serverTimestamp()
            
            });
            console.log("Test3: Success")
        }

        unsubscribe3 = thingsRef3
        .where('uid', '==', user.uid)
        
        .onSnapshot(querySnapshot => {
        
        let usersMoP = querySnapshot.docs.map(doc => {                
            return doc.data().MoP;

        }); 
        console.log(usersMoP);
        addMoP(usersMoP);
        console.log("sucess2");
    });
    


    } else {
        
        unsubscribe3 && unsubscribe();
    }
});

// Total Money Spent


let thingsRef4;
let unsubscribe4;
const SumOfLabel = document.getElementById("SumOfText");
const DefaultRadio = document.getElementById("LifeTime-Spent");
const MoneySpent =document.querySelectorAll('input[name="sumOfMoneySpent"]');
const categoriesListDollars = document.getElementById("categoriesListDollars");
const categoriesListPersentage = document.getElementById("categoriesListPersentage");
let stateOfTime;
let isLifeTime;

auth.onAuthStateChanged(user => {

    if (user) {

        
        thingsRef4 = db.collection('spendings')
        
        
        MoneySpent.forEach(radio => {
            radio.addEventListener('change', () => {
                let TimestampVAR;
                if (radio.value == "LifeTime") {
                    const now = new Date();
                    const pastLife = new Date(now);
                    pastLife.setDate(pastLife.getDate() - 100000);
                    
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const LifeTimeTimestamp = firebase.firestore.Timestamp.fromDate(pastLife);
                    console.log("Success: LifeTime")
                    console.log(`Checking:${LifeTimeTimestamp}`)
                    TimestampVAR = LifeTimeTimestamp;
                    stateOfTime = "";
                    
                }
        
                else if (radio.value == "PastYear") {
                    const now = new Date();
                    const past365Days = new Date(now);
                    past365Days.setDate(past365Days.getDate() - 365);
                    
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const past365DaysTimestamp = firebase.firestore.Timestamp.fromDate(past365Days);
                    console.log("Success: 365days")
                    console.log(`Checking:${past365DaysTimestamp}`)
                    TimestampVAR = past365DaysTimestamp;
                    stateOfTime = "in the last 365 days";
                    
                }
        
                else if (radio.value == "Past6Month") {
                    const now = new Date();
                    const past6Months = new Date(now);
                    past6Months.setDate(past6Months.getDate() - 182);
        
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const past6MonthsTimestamp = firebase.firestore.Timestamp.fromDate(past6Months);
                    console.log("Success: 182days")
                    console.log(`Checking:${past6MonthsTimestamp}`)
                    TimestampVAR = past6MonthsTimestamp;
                    stateOfTime = "in the last 6 months";
                    
                }
        
                else if (radio.value == "PastMonth") {
                    const now = new Date();
                    const pastMonth = new Date(now);
                    pastMonth.setDate(pastMonth.getDate() - 30);
        
                    const nowTimestamp = firebase.firestore.Timestamp.fromDate(now);
                    const pastMonthTimestamp = firebase.firestore.Timestamp.fromDate(pastMonth);
                    console.log("Success: 30days")
                    console.log(pastMonthTimestamp)
                    TimestampVAR = pastMonthTimestamp;
                    stateOfTime = "in the last 30 days";
                    
                }


                unsubscribe4 = thingsRef4
                .where('uid', '==', user.uid)
                
                .where('Date', '>=', TimestampVAR)
                
                .onSnapshot(querySnapshot => {
                let totalAmount = 0
                let categoryTotalDollars = {};

                querySnapshot.docs.forEach(doc => {     
                    const data = doc.data();
                    const amount_ = data.Amount;   
                    const category_ = data.Category;
                    
                    if (!categoryTotalDollars[category_]) {
                        categoryTotalDollars[category_] = 0
                    }

                    categoryTotalDollars[category_] += amount_;
                    totalAmount += amount_;
                    console.log(categoryTotalDollars);
                    
                    
                });
                console.log(categoryTotalDollars)
                AmountLIApend(categoryTotalDollars,categoriesListDollars, "$", 'first')
                let categoryTotalPersent = categoryTotalDollars;
                    for (const category in categoryTotalPersent) {
                        const percentage = (categoryTotalPersent[category] / totalAmount) * 100;
                        categoryTotalPersent[category] = percentage.toFixed(2);
                    }

                console.log(categoryTotalPersent)
                console.log(categoryTotalDollars)
                    
                SumOfLabel.textContent = `Total Money Spent ${stateOfTime} is $${totalAmount}!`;
                console.log("sucessfully summed money");

                
                AmountLIApend(categoryTotalPersent,categoriesListPersentage, "%", "last")
                
                });
            
            });
    

        
    });
    


    } else {
        
        unsubscribe4 && unsubscribe();
    }
});


function addCategories(categories) {
    const dropdown = document.getElementById('categoryDropdown');
    
    const existingOptions = new Set();
    for (let i = 0; i < dropdown.options.length; i++) {
        existingOptions.add(dropdown.options[i].value);
    }

    
    categories.forEach(category => {
        if (!existingOptions.has(category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        }
    });
};


function addMoP(MoPs) {
    const dropdown = document.getElementById('MoPDropdown');
    
    const existingOptions = new Set();
    for (let i = 0; i < dropdown.options.length; i++) {
        existingOptions.add(dropdown.options[i].value);
    };

    
    MoPs.forEach(MoP => {
        if (!existingOptions.has(MoP)) {
            const option = document.createElement('option');
            option.value = MoP;
            option.textContent = MoP;
            dropdown.appendChild(option);
        }
    });
};


function AmountLIApend(data,UL,Type,position) {
    UL.innerHTML = "";
    for (const category in data) {
        if (data.hasOwnProperty(category)) {
          const listItem = document.createElement('li');
          if (position == "first") {
            listItem.textContent = `${category}:  ${Type} ${data[category]}`;
          }
          else if (position == "last") {
            listItem.textContent = `${category}:  ${data[category]} ${Type}`;
          }
          UL.appendChild(listItem);
        }
      }
};