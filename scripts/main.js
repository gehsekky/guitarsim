const scalesContext = [
    {
        id: 'major (ionian)',
        steps: [2, 2, 1, 2, 2, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', '3', '4', '5', '6', '7'],
    },
    {
        id: 'natural minor (aiolian)',
        steps: [2, 1, 2, 2, 1, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    },
    {
        id: 'dorian',
        steps: [2, 1, 2, 2, 2, 1],
        triad: [0, 2, 4],
        degrees: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    },
    {
        id: 'phrygian',
        steps: [1, 2, 2, 2, 1, 2],
        triad: [0, 2, 4],
        degrees: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
    },
    {
        id: 'lydian',
        steps: [2, 2, 2, 1, 2, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', '3', '#4', '5', '6', '7'],
    },
    {
        id: 'mixolydian',
        steps: [2, 2, 1, 2, 2, 1],
        triad: [0, 2, 4],
        degrees: ['1', '2', '3', '4', '5', '6', 'b7'],
    },
    {
        id: 'locrian',
        steps: [1, 2, 2, 1, 2, 2],
        triad: [0, 2, 4],
        degrees: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
    },
    {
        id: 'melodic minor',
        steps: [2, 1, 2, 2, 2, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', 'b3', '4', '5', '6', '7'],
    },
    {
        id: 'harmonic minor',
        steps: [2, 1, 2, 2, 1, 3],
        triad: [0, 2, 4],
        degrees: ['1', '2', 'b3', '4', '5', 'b6', '7'],
    },
    {
        id: 'augmented',
        steps: [3, 1, 3, 1, 3],
        triad: [0, 2, 3],
        degrees: ['1', 'b3', '3', '5', '#5', '7'],
    },
    {
        id: 'whole-half diminished',
        steps: [2, 1, 2, 1, 2, 1, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', 'b3', '4', 'b5', 'b6', '6', '7'],
    },
    {
        id: 'half-whole diminished',
        steps: [1, 2, 1, 2, 1, 2, 1],
        triad: [0, 3, 5],
        degrees: ['1', 'b2', '#2', '3', 'b5', '5', '6', 'b7'],
    },
    {
        id: 'major pentatonic',
        steps: [2, 2, 3, 2],
        triad: [0, 2, 3],
        degrees: ['1', '2', '3', '5', '6'],
    },
    {
        id: 'minor pentatonic',
        steps: [3, 2, 2, 3],
        triad: [0, 1, 3],
        degrees: ['1', 'b3', '4', '5', 'b7'],
    },
    {
        id: 'major blues',
        steps: [2, 1, 1, 3, 2],
        triad: [0, 2, 3, 4],
        degrees: ['1', '2', 'b3', '3', '5', '6'],
    },
    {
        id: 'minor blues',
        steps: [3, 2, 1, 1, 3],
        triad: [0, 1, 4],
        degrees: ['1', 'b3', '4', 'b5', '5', 'b7'],
    },
    {
        id: 'arpeggio (major)',
        steps: [4, 3],
        triad: [0, 1, 2],
        degrees: ['1', '3', '5'],
    },
    {
        id: 'arpeggio (minor)',
        steps: [3, 4],
        triad: [0, 1, 2],
        degrees: ['1', 'b3', '5'],
    },
    {
        id: 'whole tone',
        steps: [2, 2, 2, 2, 2],
        triad: [0, 2, 4],
        degrees: ['1', '2', '3', '#4', '#5', 'b7'],
    },
    {
        id: 'chromatic',
        steps: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        triad: [],
        degrees: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
        ],
    },
    {
        id: 'single note',
        steps: [],
        triad: [],
        degrees: ['1'],
    },
];
const notesContext = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
];
const noteLabelsContext = ['note', 'degree', 'none'];
const highlightModesContext = ['none', 'root', 'triad'];

const buildScale = (key, steps) => {
    const scale = [key];
    let stepIndex = notesContext.indexOf(key);
    for (const step of steps) {
        stepIndex += step;
        if (stepIndex > notesContext.length - 1) {
            stepIndex %= notesContext.length;
        }
        scale.push(notesContext[stepIndex]);
    }

    return scale;
};

const getScale = (scaleId, key) => {
    const scale = scalesContext.find((scale) => scale.id === scaleId);
    return {
        ...scale,
        notes: buildScale(key, scale.steps),
    };
};

const selectOnChangeHandler = () => {
    const highlightModeValue = document.getElementById(
        'highlight-mode-select'
    ).value;
    const scaleValue = document.getElementById('scale-select').value;
    const keyValue = document.getElementById('key-select').value;
    const noteLabelValue = document.getElementById('note-label-select').value;
    const scale = getScale(scaleValue, keyValue);
    const pageContainer = document.getElementById('page-container');
    renderGuitar(
        scale,
        keyValue,
        noteLabelValue,
        highlightModeValue,
        pageContainer
    );
};

const getInitialNoteIndexForString = (stringId) => {
    switch (stringId) {
        case 5:
            return notesContext.indexOf('E');
        case 4:
            return notesContext.indexOf('A');
        case 3:
            return notesContext.indexOf('D');
        case 2:
            return notesContext.indexOf('G');
        case 1:
            return notesContext.indexOf('B');
        case 0:
            return notesContext.indexOf('E');
    }
};

const renderGuitar = (scale, key, noteLabel, highlightMode, pageContainer) => {
    const node = document.getElementById('guitar-container');
    if (node) {
        node.parentElement.removeChild(node);
    }

    const guitarContainer = document.createElement('div');
    guitarContainer.setAttribute('id', 'guitar-container');
    const table = document.createElement('table');
    table.className = 'table';
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');

    for (let i = 0; i < 6; i++) {
        let noteIndex = getInitialNoteIndexForString(i);
        const tableRow = document.createElement('tr');
        tableRow.className = `string${i} string`;
        for (let j = 0; j < 23; j++) {
            const tableCell = document.createElement('td');
            const innerCell = document.createElement('div');
            const fretClasses = [`row${i}`, `col${j}`, 'cell', 'fret'];

            if (scale.notes.indexOf(notesContext[noteIndex]) > -1) {
                const note = document.createElement('div');
                const noteClasses = ['note'];
                if (highlightMode !== 'none') {
                    switch (highlightMode) {
                        case 'root':
                            if (notesContext[noteIndex] === key) {
                                noteClasses.push('highlight');
                            }
                            break;
                        case 'triad':
                            if (
                                scale.triad.includes(
                                    scale.notes.indexOf(notesContext[noteIndex])
                                )
                            ) {
                                noteClasses.push('highlight');
                            }
                            break;
                        default:
                            throw new Error(
                                `highlight mode not supported: ${highlightMode}`
                            );
                    }
                }
                note.className = noteClasses.join(' ');
                switch (noteLabel) {
                    case 'note':
                        note.innerHTML = notesContext[noteIndex];
                        break;
                    case 'degree':
                        note.innerHTML =
                            notesContext[noteIndex] === key
                                ? '1'
                                : scale.degrees[
                                      scale.notes.indexOf(
                                          notesContext[noteIndex]
                                      )
                                  ];
                        break;
                    case 'none':
                        note.innerHTML = '&nbsp;';
                        break;
                    default:
                        throw new Error(`unrecognized noteLabel: ${noteLabel}`);
                }

                innerCell.appendChild(note);
            }

            noteIndex++;
            if (noteIndex > notesContext.length - 1) {
                noteIndex %= notesContext.length;
            }

            if (i === 0 && [0, 1, 3, 5, 7, 9, 12, 15, 17, 19, 21].includes(j)) {
                const fretNumber = document.createElement('span');
                fretNumber.className = 'fretnumber';
                fretNumber.innerHTML = j === 0 ? 'open' : j;

                fretClasses.push('fretnumber-container');
                innerCell.appendChild(fretNumber);
            }

            innerCell.className = fretClasses.join(' ');

            tableCell.appendChild(innerCell);
            tableRow.appendChild(tableCell);
        }

        table.appendChild(tableRow);
    }

    guitarContainer.appendChild(table);

    pageContainer.appendChild(guitarContainer);
};

const createSelect = (id, source) => {
    const select = document.createElement('select');
    select.setAttribute('id', id);
    select.addEventListener('change', selectOnChangeHandler);

    for (const item of source) {
        const option = document.createElement('option');
        option.setAttribute('value', item);
        option.innerHTML = item;
        select.appendChild(option);
    }
    return select;
};

const createControlContainer = (labelText) => {
    const container = document.createElement('div');
    container.className = 'control-container';

    const label = document.createElement('label');
    label.innerHTML = labelText;
    container.appendChild(label);

    return container;
};

const renderControls = (pageContainer) => {
    const controls = document.createElement('div');
    controls.setAttribute('id', 'controls-container');

    const scaleContainer = createControlContainer('scale');
    const scaleSelect = createSelect(
        'scale-select',
        scalesContext.map((scale) => scale.id)
    );
    scaleContainer.appendChild(scaleSelect);
    controls.appendChild(scaleContainer);

    const keyContainer = createControlContainer('key');
    const keySelect = createSelect('key-select', notesContext);
    keyContainer.appendChild(keySelect);
    controls.appendChild(keyContainer);

    const noteLabelContainer = createControlContainer('label');
    const noteLabelSelect = createSelect(
        'note-label-select',
        noteLabelsContext
    );
    noteLabelContainer.appendChild(noteLabelSelect);
    controls.appendChild(noteLabelContainer);

    const highlightModeContainer = createControlContainer('highlight');
    const highlightModeSelect = createSelect(
        'highlight-mode-select',
        highlightModesContext
    );
    highlightModeContainer.appendChild(highlightModeSelect);
    controls.appendChild(highlightModeContainer);

    pageContainer.appendChild(controls);
};

document.addEventListener('DOMContentLoaded', function () {
    const pageContainer = document.createElement('div');
    pageContainer.setAttribute('id', 'page-container');

    const mountPoint = document.getElementById('mount-point');
    mountPoint.appendChild(pageContainer);

    renderControls(pageContainer);

    const highlightModeValue = document.getElementById(
        'highlight-mode-select'
    ).value;
    const noteLabelValue = document.getElementById('note-label-select').value;
    const scaleValue = document.getElementById('scale-select').value;
    const keyValue = document.getElementById('key-select').value;

    const scale = getScale(scaleValue, keyValue);

    renderGuitar(
        scale,
        keyValue,
        noteLabelValue,
        highlightModeValue,
        pageContainer
    );
});
