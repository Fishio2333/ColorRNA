/**
 * Created by ��� on 2015/9/22.
 */






function colorRNA()
{


    console.log(typeof arguments[0])

//---in RGB-----------------------
    if(arguments.length == 3)
    {
        this.colorType="RGB"

        if (typeof arguments[0] == "number")
        {
            this.r = arguments[0];
        }

        if (typeof arguments[1] == "number")
        {
            this.g = arguments[1];
        }

        if (typeof arguments[2] == "number")
        {
            this.b = arguments[2];
        }
    }
//---XYZ





//---ԭ�ͺ���-----------------------

    //ȡ RGB ֵ���磺#ffffff
    colorRNA.prototype.RGBstring=function()
    {
        return "#"+this.r.toString(16)+this.g.toString(16)+this.b.toString(16)
    }


    colorRNA.prototype._arrayProduct=function(inArray,inNumber)
    {
        var sum = 0;
        for(var z=0;z<inArray.length;z++)
        {
            sum+=inArray[z]*inNumber;
        }

        return sum;
    }


    //��һ���� inNumber ��һ����inMax,inMin Ϊԭ�����С���䣬newMax Ϊ�����ֵ�����ֻ��һ����������[0,255] ��һ���� [0,1]
   colorRNA.prototype._normaliz = function (inNumber,inMax,inMin,newMax)
    {
        var newNumber = 0;

        if(arguments.length==4)
        {
            newNumber = (inNumber - inMin) / (inMax - inMin);
            newNumber=newNumber*newMax;
        }
        else
        {
            newNumber = arguments[0]/255;
        }

        return newNumber;
    }




    colorRNA.prototype.sRGB_to_XYZ=function()
    {
        var x, y,z;
        var nucleotids= [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

        function enGamma22(rgb)
        {

        }



            this.r


        console.log()
    }





}

var test_color




test_color = new colorRNA(255,233,233);



console.log(test_color.RGBstring());
console.log(test_color.sRGB_to_XYZ());
console.log("====================");

console.log("====================");


document.getElementById("color").style.background=test_color.RGBstring();
document.getElementById("color").style.color=test_color.RGBstring();
document.getElementById("color").style.fontSize="32pt";




