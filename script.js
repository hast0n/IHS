class Grid {

    constructor(layout, seriesIndex = 1) {

        this.container = document.getElementById('main_matrix');
        this.height = layout.height;
        this.width  = layout.width;
        this.layout = layout.matrix;

        this.numberToLettersEn = [
            'first',
            'second',
            'thrid',
            'fourth',
            'fifth',
            'sixth',
            'seventh',
            'heighth',
            'ninth',
        ];
        this.numberToLettersFr = [
            'premier',
            'second',
            'troisième',
            'quatrième',
            'cinquième',
            'sixième',
            'septième',
            'huitième',
            'neuvième',
        ];
        
        this.defaultText = 'Clique moi en ';
        this.numbersToLetters = null

        this.elapsed = 0;
        this.currentIndex = -1;
        this.seriesIndex = seriesIndex;
        this.clickNumber = layout.clickNumber;

        document.getElementById("exportBtn").addEventListener('click', () => {this.exportToCsv()}, false)

        this.dataTab = [];
        // this.dataTab = [
        //     ["series number"],
        // ];
    
        // for (var i = 0; i < this.clickNumber; i++) this.dataTab[0].push('click ' + (i + 1))

    }

    wipe() {
        while (this.container.firstChild) {

            var c = this.container.firstChild;
            this.container.removeChild(c);
            
            c.removeEventListener('click', this.handleClick)
        }
    }

    populate() {

        var row, col;
        var ids = [...Array(this.clickNumber).keys()]
        
        console.log(this.clickNumber);
        
        this.shuffle(ids);
        

        for (row = 0; row < this.layout.length; row++) {
            for (col = 0; col < this.layout[row].length; col++) {
                
                var node;
                
                if (this.layout[row][col] != undefined) {
                    
                    var t = ids.pop();

                    
                    node = document.createElement('button');
                    node.type = 'button';
    
                    node.classList.add('btn', 'btn-default');
                    node.style.width = Math.floor(100 / this.width) + '%'; 
                    node.style.height = Math.floor(100 / this.height) + '%';

                    node.id = t++;

                    if (this.numbersToLetters == null) {
                        node.textContent = '(' + t + ')';
                    }
                    else {
                        node.textContent = this.defaultText + this.numberToLetters[t-1];
                    }
                    node.addEventListener('click', () => { this.handleClick() }, false)
                }
                else {
                    
                    node = document.createElement('div');
    
                    node.classList.add('space');
                    node.style.width = Math.floor(100 / this.width) + '%'; 
                    node.style.height = Math.floor(100 / this.height) + '%';
                }
                
                this.container.appendChild(node);
            }
        }

        this.clickNumber = t;
    }
    
    startTime() {
        this.timeInterval = setInterval(() => {
            this.elapsed += 10;
        }, 10);
    }
    
    stopTime() {
        clearInterval(this.timeInterval);
    }

    shuffle(array) {
    
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
    
    /* ----------------------------------------------- */
    
    handleClick(event) {

        event = event || window.event;
        var target = event.target || event.srcElement;
        
        var id = parseInt(target.id);

        if (id == this.currentIndex + 1) {

            this.dataTab.push(this.elapsed);

            // HANDLE FEEDBACK
            target.classList.add('right');
            
            setTimeout(() => {
                target.textContent = '';
                target.classList.remove('right');    
                target.classList.add('placeholder');
            }, 250)
            
            target.removeEventListener('click', this.handleClick);
            
            if (this.currentIndex++ + 2 == this.clickNumber) this.endTest();

        } else {
            target.classList.add('wrong');

            setTimeout(() => {
                target.classList.remove('wrong');          
            }, 250)
        }
    }

    Test() {

        this.wipe();
        
        this.populate();

        this.startTime();

    }

    endTest() {

        this.stopTime();

    }

    exportToCsv() {

        var CsvString = "";
        
        this.dataTab.forEach(function(RowItem, RowIndex) {
            // RowItem.forEach(function(ColItem, ColIndex) {
                // CsvString += ColItem + ',';
                CsvString += RowItem + ',';
            // });
            
            // CsvString += "\r\n";
        });
        
        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        
        var x = document.createElement("A");
        x.setAttribute("href", CsvString );
        x.setAttribute("download", new Date().toISOString() + ".csv");
        
        document.body.appendChild(x);
        x.click();
    }
}

class Layout {

    constructor(width, height, layout = null, n = 9) {

        this.width  = width;
        this.height = height;
        this.layout = layout;
        this.matrix = Array.from(Array(height), () => new Array(width));

        if (layout == null) this.populateRandom(n);
        else this.populate();
    }

    populateRandom(n) {

        this.clickNumber = n;

        for (var i = 0; i < n; i++) {
        
            var row = Math.floor(Math.random() * this.height);
            var col = Math.floor(Math.random() * this.width);

            if (this.matrix[row][col] != undefined) {
                i--; continue; // malheureusement c'est possible --'
            }
            else {
                this.matrix[row][col] = n;
            }
        }
    }

    populate() {
        
        for (var i = 0; i < this.layout.length; i++) {

            var row = this.layout[i][0];
            var col = this.layout[i][1];

            this.matrix[row][col] = i+1;
        }

        this.clickNumber = this.layout.length;

    }
}

var myLayout = new Layout(10, 13, null, 9)
//      [
//     [0, 2], [0, 8], [2, 4], 
//     [7, 6], [5, 2], [11, 3],
//     [9, 9], [4, 7], [9, 2]
// ]);

var myGrid = new Grid(myLayout, 1);



myGrid.Test();

