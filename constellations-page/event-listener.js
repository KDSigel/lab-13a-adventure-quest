import { getUserData, setUserData } from '../local-storage-utils.js';
import { constellation } from './constellations.js';
import { findById } from '../local-storage-utils.js';
import { validateInput } from './validate-input.js';

const constellationForm = document.querySelector('#constellation-form');
const choiceAlert = document.getElementById('choice-alert');

constellationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInput();

    const chosenAnswer = document.querySelector('input:checked');
    const responseArray = findById(constellation.choices, chosenAnswer.id);
    const buttonEl = document.querySelector('button');
    const userData = getUserData();

    userData.shyness = Number(userData.shyness) + Number(responseArray.shyness);   
    userData.danger = Number(userData.danger) + Number(responseArray.danger);
    userData.visited[constellation.id] = true;
    
    setUserData(userData);

    const allAnswers = document.querySelectorAll('input + span');
    allAnswers.forEach(DOMElement => {
        DOMElement.style.display = 'none';});
    buttonEl.style.display = 'none';
    choiceAlert.textContent = responseArray.results;
    choiceAlert.style.display = 'inline';

    setTimeout(function(){window.location = '../sky-selection-page/';}, 3500);
});