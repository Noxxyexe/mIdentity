window.addEventListener('message', function(event) {
    if (event.data.action === 'openIdentityUI') {
        document.querySelector('.identity').style.display = 'flex';
        window.onkeydown = function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };
    }
    if (event.data.action === 'openSkinUI') {
        document.querySelector('.face').style.display = 'flex';
        document.querySelector('.container-option').style.display = 'flex';
        window.onkeydown = function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };
    }
});

function setGender(sex) {
  fetch(`https://${GetParentResourceName()}/setGender`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sex: sex })
  });
}

document.getElementById('gender-male').addEventListener('click', () => {
  setGender(0);
});

document.getElementById('gender-female').addEventListener('click', () => {
  setGender(1);
});

const genderMaleBtn = document.getElementById('gender-male');
const genderFemaleBtn = document.getElementById('gender-female');

if (genderMaleBtn && genderFemaleBtn) {
    genderMaleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        genderMaleBtn.classList.add('active');
        genderFemaleBtn.classList.remove('active');
    });
    genderFemaleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        genderFemaleBtn.classList.add('active');
        genderMaleBtn.classList.remove('active');
    });
}

const btn = document.getElementById('identity-button');
if (btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        let date = document.getElementById('date').value;
        if (date && date.includes('/')) {
            const parts = date.split('/');
            if (parts.length === 3) {
                date = parts[2] + '-' + parts[1] + '-' + parts[0];
            }
        }
        const height = document.getElementById('height').value;
        const history = document.getElementById('history').value;
        let gender = '';
        if (genderMaleBtn.classList.contains('active')) {
            gender = 'm';
        } else if (genderFemaleBtn.classList.contains('active')) {
            gender = 'f';
        }
        if (!firstname || !lastname || !date || !height || !gender) {
            fetch('https://mIdentity/showNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    text: 'Merci de remplir tous les champs obligatoires.'
                })
            });
            return;
        }
        fetch('https://mIdentity/submitIdentity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                dateofbirth: date,
                sex: gender,
                height: height,
                history: history
            })
        }).then(() => {
            document.querySelector('.identity').style.display = 'none';
            // fetch('https://mIdentity/closeIdentityUI', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json; charset=UTF-8'
            //     },
            //     body: JSON.stringify({})
            // });
        });
    });
}

const nextButton = document.getElementById('next-button');
if (nextButton) {
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.container-option').style.display = 'none';
        document.querySelector('.face').style.display = 'none';

        fetch('https://mIdentity/closeSkinUI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        });
    });
}

const colorGrids = document.querySelectorAll('.color-grid');

colorGrids.forEach(grid => {
  const boxes = grid.querySelectorAll('.color-box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      boxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
    });
  });
});

function updateSliderGradient(slider) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;
    slider.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--secondary-container) ${percentage}%, var(--secondary-container) 100%)`;
}

document.addEventListener('DOMContentLoaded', function() {
    function syncSliderWithInput(slider, input, isBinary = false) {
        slider.addEventListener('input', function() {
            let value = parseFloat(this.value);
            
            if (isBinary) {
                value = value > 0.5 ? 1 : 0;
                this.value = value;
            } else {
                value = Math.round(value);
                this.value = value;
            }
            
            input.value = value;
            updateSliderGradient(this);
        });
        
        input.addEventListener('input', function() {
            let value = parseFloat(this.value) || 0;
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            
            if (value < min) value = min;
            if (value > max) value = max;
            
            if (isBinary) {
                value = value > 0.5 ? 1 : 0;
            } else {
                value = Math.round(value);
            }
            
            this.value = value;
            slider.value = value;
            updateSliderGradient(slider);
        });
        
        if (isBinary) {
            const initialValue = slider.value > 0.5 ? 1 : 0;
            slider.value = initialValue;
            input.value = initialValue;
        } else {
            const initialValue = Math.round(slider.value);
            slider.value = initialValue;
            input.value = initialValue;
        }
        
        updateSliderGradient(slider);
    }

    const binarySlider = document.getElementById('binarySlider');
    const binaryInput = document.getElementById('binaryInput');
    const rangeSlider = document.getElementById('rangeSlider');
    const rangeInput = document.getElementById('rangeInput');
    
    if (binarySlider && binaryInput) {
        syncSliderWithInput(binarySlider, binaryInput, true);
    }
    
    if (rangeSlider && rangeInput) {
        syncSliderWithInput(rangeSlider, rangeInput, false);
    }

    function updateGender(value) {
        const gender = parseInt(value);
        binarySlider.value = gender;
        binaryInput.value = gender;
        fetch(`https://mIdentity/changeGender`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gender: gender })
        });
    }

    function updateFaceMdWeight(value) {
        const normalized = value;
        fetch(`https://${GetParentResourceName()}/updateFaceMdWeight`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ face_md_weight: normalized }),
        });
    }
      
    // binarySlider.addEventListener('input', (e) => {
    //   updateGender(e.target.value);
    // });
    // binaryInput.addEventListener('input', (e) => {
    //   updateGender(e.target.value);
    // });

    rangeSlider.addEventListener("input", () => {
        rangeInput.value = rangeSlider.value;
        updateFaceMdWeight(parseFloat(rangeSlider.value));
    });
    rangeInput.addEventListener("input", () => {
        rangeSlider.value = rangeInput.value;
        updateFaceMdWeight(parseFloat(rangeInput.value));
    });

    const eyeColorBoxes = document.querySelectorAll('#eyeColorGrid .color-box');

    eyeColorBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            eyeColorBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            fetch(`https://${GetParentResourceName()}/updateEyeColor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eye_color: index })
            });
        });
    });

    const eyebrowsSlider = document.getElementById("eyebrowsSlider");
    const eyebrowsInput = document.getElementById("eyebrowsInput");
      
      function updateEyebrows(value) {
        fetch(`https://${GetParentResourceName()}/updateEyebrows`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eyebrows_1: value }),
        });
      }

      eyebrowsSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        eyebrowsInput.value = val;
        updateEyebrows(val);
      });
      
      eyebrowsInput.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        eyebrowsSlider.value = val;
        updateEyebrows(val);
      });

      const eyebrowColors = document.querySelectorAll('#eyebrowColorGrid .color-box');

      function applyEyebrowColor(index) {
        fetch(`https://${GetParentResourceName()}/updateEyebrowsColor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ eyebrows_3: index })
        }).then(res => res.json()).then(response => {
        });
      }

      eyebrowColors.forEach(colorBox => {
        colorBox.addEventListener('click', () => {
          const colorIndex = colorBox.getAttribute('data-color');
          applyEyebrowColor(parseInt(colorIndex));
          eyebrowColors.forEach(c => c.classList.remove('selected'));
          colorBox.classList.add('selected');
        });
      });

      const hairSlider = document.getElementById('hairSlider');
      const hairInput = document.getElementById('hairInput');

      function updateHair(value) {
        fetch(`https://${GetParentResourceName()}/updateHair`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hair_1: value }),
        });
      }

      hairSlider.addEventListener("input", (e) => {
        const hairValue = parseInt(e.target.value);
        hairInput.value = hairValue;
        updateHair(hairValue);
      });
      
      hairInput.addEventListener("input", (e) => {
        const hairValue = parseInt(e.target.value);
        hairSlider.value = hairValue;
        updateHair(hairValue);
      });

      const hairColors = document.querySelectorAll('#hairColorGrid .color-box');

      function applyHairColor(index) {
        fetch(`https://${GetParentResourceName()}/updateHairColor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ hair_color_1: index })
        }).then(res => res.json()).then(response => {
        });
      }

      hairColors.forEach(colorBox => {
        colorBox.addEventListener('click', () => {
          const colorIndex = colorBox.getAttribute('data-color');
          applyHairColor(parseInt(colorIndex));
          hairColors.forEach(c => c.classList.remove('selected'));
          colorBox.classList.add('selected');
        });
      });

      const beardSlider = document.getElementById('beardSlider');
      const beardInput = document.getElementById('beardInput');

      function updateBeard(value) {
        fetch(`https://${GetParentResourceName()}/updateBeard`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ beard_1: value }),
        });
      }

      beardSlider.addEventListener("input", (e) => {
        const beardValue = parseInt(e.target.value);
        beardInput.value = beardValue;
        updateBeard(beardValue);
      });
      
      beardInput.addEventListener("input", (e) => {
        const beardValue = parseInt(e.target.value);
        beardSlider.value = beardValue;
        updateBeard(beardValue);
      });

      const beardColors = document.querySelectorAll('#beardColorGrid .color-box');

      function applyBeardColor(index) {
        fetch(`https://${GetParentResourceName()}/updateBeardColor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ beard_3: index })
        }).then(res => res.json()).then(response => {
        });
      }

      beardColors.forEach(colorBox => {
        colorBox.addEventListener('click', () => {
          const colorIndex = colorBox.getAttribute('data-color');
          applyBeardColor(parseInt(colorIndex));
          beardColors.forEach(c => c.classList.remove('selected'));
          colorBox.classList.add('selected');
        });
      });
});

const fatherBtn = document.getElementById('face-dad');
const motherBtn = document.getElementById('face-mom');
const fatherGroup = document.getElementById('face-group-father');
const motherGroup = document.getElementById('face-group-mother');

fatherBtn.addEventListener('click', () => {
  fatherGroup.style.display = 'flex';
  motherGroup.style.display = 'none';

  fatherBtn.classList.add('active');
  motherBtn.classList.remove('active');
});

motherBtn.addEventListener('click', () => {
  motherGroup.style.display = 'flex';
  fatherGroup.style.display = 'none';

  motherBtn.classList.add('active');
  fatherBtn.classList.remove('active');
});

let selectedFather = null;
let selectedMother = null;
let blend = 0.5;

document.querySelectorAll('[data-parent-index]').forEach(el => {
    el.addEventListener('click', () => {
        selectedFather = parseInt(el.getAttribute('data-parent-index'));
        document.querySelectorAll('[data-parent-index]').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        updateHeritage(selectedMother, selectedFather, blend);
    });
});
  
document.querySelectorAll('[data-mother-index]').forEach(el => {
    el.addEventListener('click', () => {
        selectedMother = parseInt(el.getAttribute('data-mother-index'));
        document.querySelectorAll('[data-mother-index]').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        updateHeritage(selectedMother, selectedFather, blend);
    });
});

function updateHeritage(mother, father, shapeMix) {
    fetch(`https://${GetParentResourceName()}/updateHeritage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mom: mother,
            dad: father,
            shapeMix: shapeMix
        }),
    });
}