/**
 * Created by ��� on 2015/9/22.
 */






function colorRNA()
{


    console.log(typeof arguments[0])

//---in RGB-----------------------
    if (arguments.length == 3)
    {
        this.colorType = "RGB"

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
//---˽��

    var _gamma = -2.2;// _gamma < 0 ��ʾ sRGB ģʽ


//---ԭ�ͺ���-----------------------


    //ȡ RGB ֵ���磺#ffffff
    colorRNA.prototype.RGBstring = function ()
    {
        return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)
    }


    colorRNA.prototype._arrayProduct = function (inArray, inArray2)
    {
        var sum = 0;
        for (var z = 0; z < inArray.length; z++)
        {
            sum += inArray[z] * inArray2[z];
        }

        return sum;
    }


    //��һ���� inNumber ��һ����inMax,inMin Ϊԭ�����С���䣬newMax Ϊ�����ֵ�����ֻ��һ����������[0,255] ��һ���� [0,1]
    colorRNA.prototype._normaliz = function (inNumber, inMin, inMax, newMax)
    {
        var newNumber = 0;

        if (arguments.length == 4)
        {
            newNumber = (inNumber - inMin) / (inMax - inMin);
            newNumber = newNumber * newMax;
        }
        else
        {
            newNumber = arguments[0] / 255;
        }

        return newNumber;
    }

    //���Ѿ���һ���� RGB ֵ����  Gamma 2.2 �ı任��
    colorRNA.prototype._enGamma = function (rgb)
    {
        var newRGB = 0;
        var sign = 1;

        if (rgb < 0)//���������
        {
            sign = -1;
            rgb = -rgb;
        }


        if (_gamma < 0)//----sRGB-----------
        {

            if (rgb <= 0.0031306684425005883)
            {
                newRGB = sign * rgb * 12.92;
            }
            else
            {
                newRGB = sign * 1.055 * Math.pow(rgb, 0.416666666666666667) - 0.055 //0.416666666666666667 = 1/2.4;
            }
        }
        if (_gamma == 0)//-----L*-----------
        {

            if (rgb <= (216.0 / 24389.0))
            {
                newRGB = sign *  (rgb * 24389.0 / 2700.0) ;
            }
            else
            {
                newRGB = sign *  (1.16 * Math.pow(rgb, 1.0 / 3.0) - 0.16);
            }
        }
        if (_gamma > 0)//-----��ͨ Gamma-----------
        {

            newRGB = sign * Math.pow(rgb, 1/_gamma);
        }


        return newRGB;

    }

    //�þ��� Gamma  �ı任 RGB ��һ��ֵ��ԭ
    colorRNA.prototype._deGamma = function (rgb)
    {
        var newRGB = 0;
        var sign = 1;

        if (rgb < 0)//���������
        {
            sign = -1;
            rgb = -rgb;
        }


        if (_gamma < 0)//----sRGB-----------
        {

            if (rgb <= 0.0404482362771076)
            {
                newRGB =sign * rgb / 12.92;
            }
            else
            {
                newRGB = sign * Math.pow((rgb + 0.055) / 1.055, 2.4);
            }
        }
        if (_gamma == 0)//-----L*-----------
        {

            if (rgb <= 0.08)
            {
                newRGB = sign * 2700.0 * rgb / 24389.0;
            }
            else
            {
                newRGB = sign * ((((1000000.0 * rgb + 480000.0) * rgb + 76800.0) * rgb + 4096.0) / 1560896.0);
            }
        }
        if (_gamma > 0)//-----��ͨ Gamma-----------
        {

            newRGB = sign * Math.pow(rgb, _gamma);
        }

        return newRGB;
    }


    colorRNA.prototype.sRGB_to_XYZ = function ()
    {
        var x, y, z;
        this._gamma = -2.2222;

        var rgbs =
            [
                this._deGamma(this._normaliz(this.r)),
                this._deGamma(this._normaliz(this.g)),
                this._deGamma(this._normaliz(this.b))
            ];


        var nucleotids = [[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]];
        //�;��ȣ� nucleotids =[[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

        x = this._arrayProduct(rgbs, nucleotids[0]);
        y = this._arrayProduct(rgbs, nucleotids[1]);
        z = this._arrayProduct(rgbs, nucleotids[2]);


        console.log([x, y, z]);
    }


}

var test_color


test_color = new colorRNA(213, 113, 90);


console.log(test_color.RGBstring());
console.log("====================");
console.log(test_color.sRGB_to_XYZ());


document.getElementById("color").style.background = test_color.RGBstring();
document.getElementById("color").style.color = test_color.RGBstring();
document.getElementById("color").style.fontSize = "32pt";




