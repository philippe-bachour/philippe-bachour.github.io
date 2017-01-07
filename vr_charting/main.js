startup();

document.getElementById('StartBut').addEventListener("click", startRecognition, false);
document.getElementById('StopBut').addEventListener("click", stopRecognition, false);
var dbg = document.getElementById('dbg');
var final_transcript = '';
var recognition;
var CurrentField = document.getElementById('48a');


var TeethMajor = [
    "18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28",
    "48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"
];
var TeethMinor = [
    "a", "b", "c"
];

var CurrentTeeth = {major:16,minor:0};

function startRecognition(event)
{
    printf("Recognition started :\n");
    final_transcript = '';
    recognition.lang = 'fr-FR';
    CurrentField.focus();
    recognition.start();
}
function stopRecognition()
{
    recognition.stop();
}

function startup()
{
    if (!('webkitSpeechRecognition' in window))
    {
        printf("Speech API not supported by your browser, you must use Chrome version 25 or later.");
    }
    else
    {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
    
        recognition.onstart = function()
        {
            printf("Starting from 48 distal...");
        };
        recognition.onresult = function(event)
        {
            for (var i = event.resultIndex ; i < event.results.length ; ++i)
            {
                if (event.results[i][0].transcript.includes("stop"))
                {
                    recognition.stop();
                    printf("End of recognition.\n");
                }
                else if (event.results[i][0].transcript.includes("dent"))
                {
                    
                }
                else if(parseInt(event.results[i][0].transcript) || event.results[i][0].transcript.includes("un"))
                {
                    CurrentField.value = parseInt(event.results[i][0].transcript);
                    getNextTeeth();
                    getCurrentField();
                }
                else
                    printf(event.results[i][0].transcript);
            }
        };
        recognition.onerror = function(event) 
        {
        
        };
        recognition.onend = function()
        {
        
        };
    }    
}

function printf(string)
{
    dbg.value += string;
    dbg.scrollTop = dbg.scrollHeight;
}

function getNextTeeth()
{
    CurrentTeeth.minor++;
    if (CurrentTeeth.minor == 3)
    {
        CurrentTeeth.minor = 0;
        CurrentTeeth.major++;
        if (CurrentTeeth.major == TeethMajor.length)
            CurrentTeeth.major = 0;
    }
}

function getCurrentField()
{
    CurrentField = document.getElementById(TeethMajor[CurrentTeeth.major] + TeethMinor[CurrentTeeth.minor]);
    CurrentField.focus();
    printf(CurrentField.id + '\n');
}

var dsp = new CRTDisplay();
dsp.init();

var HEIGHT_STEP = 5; // px Y step offset

function Teeth(id, posx, posy)
{
    this.m_Exists = true;
    this.m_Id = id;
    this.m_ProbingDepth = { a:0 , b:4 , c:0 };
    this.m_ImgFront = new Image();
    
    this.m_Rect = { x:posx, y:posy, w:102, h:239 };
    
    this.draw = function()
    {
        dsp.m_Context.clearRect(this.m_Rect.x, this.m_Rect.y, this.m_Rect.w, this.m_Rect.h);
        var offset = 105;
        var sign = -1;
        if (this.m_Id > 30)
        {
            offset = 135;
            sign = 1;
        }
		if (this.m_Exists)
        {
            dsp.m_Context.drawImage(this.m_ImgFront, this.m_Rect.x, this.m_Rect.y);
            dsp.m_Context.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.a * HEIGHT_STEP);
            dsp.m_Context.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.b * HEIGHT_STEP);
            dsp.m_Context.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.c * HEIGHT_STEP);
            dsp.m_Context.lineWidth = 2;
            dsp.m_Context.strokeStyle = '#B51515';
            dsp.m_Context.stroke();
        }
    }
}

function CRTDisplay()
{
    this.m_Canvas = document.getElementById('vrc_display');
    this.m_Context = this.m_Canvas.getContext('2d');
    this.m_LeftToLoad = 32;
    this.m_Canvas.width = 1632;
    this.m_Canvas.height = 478;

    this.m_Teeth = new Array(32);
    
    this.init = function()
    {
        this.m_CellWidth = this.m_Canvas.width / 16;
        this.m_CellHeight = this.m_Canvas.height / 4;
        
        for (var i = 11 ; i < 19 ; i++)
        {
            this.m_Teeth[i - 11] = new Teeth(i, this.m_CellWidth * - (i - 18), 0);
			
            this.m_Teeth[i - 11].m_ImgFront.src = "Images/" + i + ".png";
            this.m_Teeth[i - 11].m_ImgFront.onload = this.checkLoadState.bind(this);
        }
        for (var i = 21 ; i < 29 ; i++)
        {
            this.m_Teeth[i - 13] = new Teeth(i, this.m_CellWidth * (i-13), 0);
			
            this.m_Teeth[i - 13].m_ImgFront.src = "Images/" + i + ".png";
            this.m_Teeth[i - 13].m_ImgFront.onload = this.checkLoadState.bind(this); 
        }
        for (var i = 31 ; i < 39 ; i++)
        {
            this.m_Teeth[i - 15] = new Teeth(i, this.m_CellWidth * (i-23), 239);
			
            this.m_Teeth[i - 15].m_ImgFront.src = "Images/" + i + ".png"; 
            this.m_Teeth[i - 15].m_ImgFront.onload = this.checkLoadState.bind(this); 
        }
        for (var i = 41 ; i < 49 ; i++)
        {
            this.m_Teeth[i - 17] = new Teeth(i, this.m_CellWidth * -(i - 48), 239);
			
            this.m_Teeth[i - 17].m_ImgFront.src = "Images/" + i + ".png";
            this.m_Teeth[i - 17].m_ImgFront.onload = this.checkLoadState.bind(this);
        }
    }
    
    this.checkLoadState = function()
    {
        --this.m_LeftToLoad;
        if (this.m_LeftToLoad == 0)
        {
            this.drawBackground();
        }
    }
    
    this.drawBackground = function()
    {
		this.m_Context.fillStyle="#353535";
        this.m_Context.clearRect(0, 0, this.m_Canvas.width, this.m_Canvas.height);
        
        for (var i = 0 ; i < this.m_Teeth.length ; ++i)
        {
            this.m_Teeth[i].draw();
        }
    }
    
}