/**
 * Created by 语冰 on 2015/9/22.
 */






function ColorRNA()
{
//---私有
    this._gamma = -2.2; //gamma 变换值； _gamma < 0 表示 sRGB 模式
    this._dLV = 1; //计算精度 2：16位, 1：7位, 0：4位;

    this._doAdapta = false;
    this._refWhite = {X: 0, Y: 0, Z: 0};// 参考白

    this._adt_mtxAdaptMa = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    this._adt_mtxAdaptMaI = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];


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


//---原型函数-----------------------


    //取 RGB 值，如：#ffffff
    ColorRNA.prototype.RGBstring = function ()
    {
        return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)
    }


    ColorRNA.prototype._arrayProduct = function (inArray, inArray2)
    {
        var sum = 0;
        for (var z = 0; z < inArray.length; z++)
        {
            sum += inArray[z] * inArray2[z];
        }

        return sum;
    }


    ColorRNA.prototype._adt_adaptation = function (XYZs, algName)
    {


    }


    //把一个数 inNumber 归一化；inMax,inMin 为原最大最小区间，newMax 为新最大值；如果只有一个参数将按[0,255] 归一化到 [0,1]
    ColorRNA.prototype._normaliz = function (inNumber, inMin, inMax, newMax)
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

    //对已经归一化的 RGB 值进行  Gamma 2.2 的变换，
    ColorRNA.prototype._enGamma = function (rgb)
    {
        var newRGB = 0;
        var sign = 1;

        if (rgb < 0)//处理负数情况
        {
            sign = -1;
            rgb = -rgb;
        }


        if (this._gamma < 0)//----sRGB-----------
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
        if (this._gamma == 0)//-----L*-----------
        {

            if (rgb <= (216.0 / 24389.0))
            {
                newRGB = sign * (rgb * 24389.0 / 2700.0);
            }
            else
            {
                newRGB = sign * (1.16 * Math.pow(rgb, 1.0 / 3.0) - 0.16);
            }
        }
        if (this._gamma > 0)//-----普通 Gamma-----------
        {

            newRGB = sign * Math.pow(rgb, 1 / this._gamma);
        }


        return newRGB;

    }

    ColorRNA.prototype._adt_setRefWhite = function (lightname)
    {
        this._refWhite.Y = 1.0;
        switch (lightname)
        {
            case "A" ://(ASTM E308-01)
            {
                this._refWhite.X = 1.09850;
                this._refWhite.Z = 0.35585;
                break;
            }
            case "B" ://(Wyszecki & Stiles, p. 769)
            {
                this._refWhite.X = 0.99072;
                this._refWhite.Z = 0.85223;
                break;
            }
            case "C" :// (ASTM E308-01)
            {
                this._refWhite.X = 0.98074;
                this._refWhite.Z = 1.18232;
                break;
            }
            case "D50" :
            {
                this._refWhite.X = 0.96422;
                this._refWhite.Z = 0.82521;
                break;
            }
            case "D55" :
            {
                this._refWhite.X = 0.95682;
                this._refWhite.Z = 0.92149;
                break;
            }
            case "D65" :
            {
                this._refWhite.X = 0.95047;
                this._refWhite.Z = 1.08883;
                break;
            }
            case "D75" :
            {
                this._refWhite.X = 0.94972;
                this._refWhite.Z = 1.22638;
                break;
            }
            case "D75" :
            {
                this._refWhite.X = 0.94972;
                this._refWhite.Z = 1.22638;
                break;
            }
            case "E" :
            {
                this._refWhite.X = 1.00000;
                this._refWhite.Z = 1.00000;
                break;
            }
            case "F2" :
            {
                this._refWhite.X = 0.99186;
                this._refWhite.Z = 0.67393;
                break;
            }
            case "F7" :
            {
                this._refWhite.X = 0.95041;
                this._refWhite.Z = 1.08747;
                break;
            }
            case "F11" :
            {
                this._refWhite.X = 1.00962;
                this._refWhite.Z = 0.64350;
                break;
            }
        }
    }

    ColorRNA.prototype._adt_setAdaptMa = function (aglName)
    {
        switch (aglName)
        {
            case "Bradford" :
            {
                this._adt_mtxAdaptMa = [
                    [0.8951, -0.7502, 0.0389],
                    [0.2664, 1.7135, -0.0685],
                    [-0.1614, 0.0367, 1.0296]];

                this._adt_mtxAdaptMaI = [
                    [0.9869929054667123, 0.43230526972339456, -0.008528664575177328],
                    [-0.14705425642099013, 0.5183602715367776, 0.04004282165408487],
                    [0.15996265166373125, 0.0492912282128556, 0.9684866957875502]];
                break;
            }
            case "vonKries" : //von Kries
            {
                this._adt_mtxAdaptMa = [
                    [0.40024, -0.2263, 0],
                    [0.7076, 1.16532, 0],
                    [-0.08081, 0.0457, 0.91822]];

                this._adt_mtxAdaptMaI = [
                    [1.8599363874558397, 0.3611914362417676, -0],
                    [-1.1293816185800916, 0.6388124632850422, -0],
                    [0.21989740959619328, -0.000006370596838650885, 1.0890636230968613]];
                break;
            }

        }


    }


    //让经过 Gamma  的变换 RGB 归一化值还原
    ColorRNA.prototype._deGamma = function (rgb)
    {
        var newRGB = 0;
        var sign = 1;

        if (rgb < 0)//处理负数情况
        {
            sign = -1;
            rgb = -rgb;
        }


        if (this._gamma < 0)//----sRGB-----------
        {

            if (rgb <= 0.0404482362771076)
            {
                newRGB = sign * rgb / 12.92;
            }
            else
            {
                newRGB = sign * Math.pow((rgb + 0.055) / 1.055, 2.4);
            }
        }
        if (this._gamma == 0)//-----L*-----------
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
        if (this._gamma > 0)//-----普通 Gamma-----------
        {

            newRGB = sign * Math.pow(rgb, this._gamma);
        }

        return newRGB;
    }


    ColorRNA.prototype._getRGBnucleotids = function (rabColorSpaceName)
    {

        switch (rabColorSpaceName)
        {
            //sRGB---------------------------------------
            case "sRGB":
                if (this._dLV == 2)
                {
                    return [[0.4124564390896922, 0.357576077643909, 0.18043748326639894],
                        [0.21267285140562253, 0.715152155287818, 0.07217499330655958],
                        [0.0193338955823293, 0.11919202588130297, 0.9503040785363679]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.4124564, 0.3575761, 0.1804375],
                        [0.2126729, 0.7151522, 0.072175],
                        [0.0193339, 0.119192, 0.9503041]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.4125, 0.3576, 0.1804],
                        [0.2127, 0.7152, 0.0722],
                        [0.0193, 0.1192, 0.9503]];
                }
                break;
            //Adobe RGB (1998)-------------------------------------
            case "AdobeRGB":
            {
                this._gamma = 2.2;
                if (this._dLV == 2)
                {
                    return [[0.5767308871981477, 0.18555395071121408, 0.18818516209063843],
                        [0.29737686371154487, 0.6273490714522, 0.07527406483625537],
                        [0.027034260337413143, 0.0706872193185578, 0.9911085203440292]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.5767309, 0.185554, 0.1881852],
                        [0.2973769, 0.6273491, 0.0752741],
                        [0.0270343, 0.0706872, 0.9911085]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.5767, 0.1856, 0.1882],
                        [0.2974, 0.6273, 0.0753],
                        [0.027, 0.0707, 0.9911]];
                }
                break;
            }
            //Apple RGB -------------------------------------
            case "AppleRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.4497288365610329, 0.31624860938967136, 0.1844925540492957],
                        [0.24465248708920193, 0.6720282949530516, 0.08331921795774647],
                        [0.025184814847417827, 0.14118241490610328, 0.9224627702464786]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.4497288, 0.3162486, 0.1844926],
                        [0.2446525, 0.6720283, 0.0833192],
                        [0.0251848, 0.1411824, 0.9224628]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.4497, 0.3162, 0.1845],
                        [0.2447, 0.672, 0.0833],
                        [0.0252, 0.1412, 0.9225]];
                }
                break;
            }
            //Best RGB -------------------------------------
            case "BestRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.6326696499956765, 0.20455579792131387, 0.12699455208300955],
                        [0.22845686422193134, 0.7373522948326431, 0.034190840945425655],
                        [0, 0.009514223159130886, 0.8156957768408691]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.6326696, 0.2045558, 0.1269946],
                        [0.2284569, 0.7373523, 0.0341908],
                        [0, 0.0095142, 0.8156958]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.6327, 0.2046, 0.127],
                        [0.2285, 0.7374, 0.0342],
                        [0, 0.0095, 0.8157]];
                }
                break;
            }
            //Beta RGB -------------------------------------
            case "BetaRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.671253700292543, 0.17458338980154234, 0.11838290990591456],
                        [0.30327257771637545, 0.6637860908315439, 0.03294133145208057],
                        [5.409707559738789e-17, 0.040700961469342455, 0.7845090385306573]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.6712537, 0.1745834, 0.1183829],
                        [0.3032726, 0.6637861, 0.0329413],
                        [0, 0.040701, 0.784509]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.6713, 0.1746, 0.1184],
                        [0.3033, 0.6638, 0.0329],
                        [0, 0.0407, 0.7845]];
                }
                break;
            }
            //Bruce RGB -------------------------------------
            case "BruceRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.4674161637795275, 0.2944512299212599, 0.18860260629921258],
                        [0.24101145944881885, 0.6835474980314961, 0.07544104251968503],
                        [0.021910132677165326, 0.0736128074803149, 0.9933070598425197]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.4674162, 0.2944512, 0.1886026],
                        [0.2410115, 0.6835475, 0.075441],
                        [0.0219101, 0.0736128, 0.9933071]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.4674, 0.2945, 0.1886],
                        [0.241, 0.6835, 0.0754],
                        [0.0219, 0.0736, 0.9933]];
                }
                break;
            }
            //CIE RGB -------------------------------------
            case "CIERGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.48871796548117163, 0.31068034326701394, 0.20060169125181454],
                        [0.1762044365340279, 0.8129846938775509, 0.010810869588421142],
                        [0, 0.010204828793442072, 0.9897951712065579]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.488718, 0.3106803, 0.2006017],
                        [0.1762044, 0.8129847, 0.0108109],
                        [0, 0.0102048, 0.9897952]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.4887, 0.3107, 0.2006],
                        [0.1762, 0.813, 0.0108],
                        [0, 0.0102, 0.9898]];
                }
                break;
            }
            //ColorMatch RGB -------------------------------------
            case "ColorMatchRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.509343853397384, 0.3209070884940387, 0.13396905810857737],
                        [0.2748839843731914, 0.6581314865725201, 0.06698452905428869],
                        [0.024254469209399214, 0.1087820638962844, 0.6921734668943165]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.5093439, 0.3209071, 0.1339691],
                        [0.274884, 0.6581315, 0.0669845],
                        [0.0242545, 0.1087821, 0.6921735]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.5093, 0.3209, 0.134],
                        [0.2749, 0.6581, 0.067],
                        [0.0243, 0.1088, 0.6922]];
                }
                break;
            }
            //ECI RGB v2 -------------------------------------
            case "ECIRGBv2":
            {
                if (this._dLV == 2)
                {
                    return [[0.650204257079646, 0.1780773570796461, 0.13593838584070797],
                        [0.32024985796460176, 0.6020710644121368, 0.07767907762326169],
                        [-5.3871025143217717e-17, 0.06783899317319857, 0.7573710068268015]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.6502043, 0.1780774, 0.1359384],
                        [0.3202499, 0.6020711, 0.0776791],
                        [-0, 0.067839, 0.757371]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.6502, 0.1781, 0.1359],
                        [0.3202, 0.6021, 0.0777],
                        [0, 0.0678, 0.7574]];
                }
                break;
            }
            //Don RGB 4 -------------------------------------
            case "DonRGB4":
            {
                if (this._dLV == 2)
                {
                    return [[0.645771138436728, 0.19335110357732524, 0.12509775798594666],
                        [0.2783496286365207, 0.6879702057518782, 0.033680165611601025],
                        [0.0037113283818203304, 0.01798614916998376, 0.8035125224481958]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.6457711, 0.1933511, 0.1250978],
                        [0.2783496, 0.6879702, 0.0336802],
                        [0.0037113, 0.0179861, 0.8035125]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.6458, 0.1934, 0.1251],
                        [0.2783, 0.688, 0.0337],
                        [0.0037, 0.018, 0.8035]];
                }
                break;
            }
            //Ekta Space PS5 -------------------------------------
            case "EktaSpacePS5":
            {
                if (this._dLV == 2)
                {
                    return [[0.5938913615570769, 0.2729801227546152, 0.09734851568830809],
                        [0.26062858312936465, 0.7349464843393485, 0.004424932531286731],
                        [4.743538587961513e-17, 0.04199694196224853, 0.7832130580377514]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.5938914, 0.2729801, 0.0973485],
                        [0.2606286, 0.7349465, 0.0044249],
                        [0, 0.0419969, 0.7832131]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.5939, 0.273, 0.0973],
                        [0.2606, 0.7349, 0.0044],
                        [0, 0.042, 0.7832]];
                }
                break;
            }
            //NTSC RGB -------------------------------------
            case "NTSCRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.6068909212389378, 0.1735011212389381, 0.20034795752212392],
                        [0.2989164238938052, 0.5865990289506955, 0.11448454715549937],
                        [-5.028240852204785e-17, 0.06609566523388125, 1.116224334766119]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.6068909, 0.1735011, 0.200348],
                        [0.2989164, 0.586599, 0.1144845],
                        [-0, 0.0660957, 1.1162243]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.6069, 0.1735, 0.2003],
                        [0.2989, 0.5866, 0.1145],
                        [0, 0.0661, 1.1162]];
                }
                break;
            }

            //PAL/SECAM RGB -------------------------------------
            case "PALSECAMRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.4306190335097004, 0.3415419122574957, 0.17830905423280421],
                        [0.22203793915343925, 0.7066384391534394, 0.07132362169312169],
                        [0.020185267195767184, 0.12955038051146386, 0.9390943522927689]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.430619, 0.3415419, 0.1783091],
                        [0.2220379, 0.7066384, 0.0713236],
                        [0.0201853, 0.1295504, 0.9390944]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.4306, 0.3415, 0.1783],
                        [0.222, 0.7066, 0.0713],
                        [0.0202, 0.1296, 0.9391]];
                }
                break;
            }
            //ProPhoto RGB -------------------------------------
            case "ProPhotoRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.7976749444306044, 0.13519170147409815, 0.031353354095297416],
                        [0.2880402378623102, 0.7118740972357901, 0.00008566490189971971],
                        [0, 0, 0.82521]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.7976749, 0.1351917, 0.0313534],
                        [0.2880402, 0.7118741, 0.0000857],
                        [0, 0, 0.82521]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.7977, 0.1352, 0.0314],
                        [0.288, 0.7119, 0.0001],
                        [0, 0, 0.8252]];
                }
                break;
            }
            //SMPTE-C RGB -------------------------------------
            case "SMPTECRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.3935890809541021, 0.365249655704132, 0.19163126334176603],
                        [0.21241315480062656, 0.7010436940127694, 0.08654315118660402],
                        [0.018742337188290558, 0.11193134610287912, 0.9581563167088301]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.3935891, 0.3652497, 0.1916313],
                        [0.2124132, 0.7010437, 0.0865432],
                        [0.0187423, 0.1119313, 0.9581563]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.3936, 0.3652, 0.1916],
                        [0.2124, 0.701, 0.0865],
                        [0.0187, 0.1119, 0.9582]];
                }
                break;
            }
            //Wide Gamut RGB -------------------------------------
            case "WideGamutRGB":
            {
                if (this._dLV == 2)
                {
                    return [[0.7161045686144476, 0.10092960102210317, 0.1471858303634494],
                        [0.25818736147323623, 0.7249378299500627, 0.016874808576701202],
                        [0, 0.05178127356786167, 0.7734287264321384]];
                }
                else if (this._dLV == 1)
                {
                    return [[0.7161046, 0.1009296, 0.1471858],
                        [0.2581874, 0.7249378, 0.0168748],
                        [0, 0.0517813, 0.7734287]];
                }
                else if (this._dLV == 0)
                {
                    return [[0.7161, 0.1009, 0.1472],
                        [0.2582, 0.7249, 0.0169],
                        [0, 0.0518, 0.7734]];
                }
                break;
            }
        }
    }


    ColorRNA.prototype.RGB_to_XYZ = function ()
    {
        var x, y, z;
        //this._gamma = -2.2222;
        var nucleotids = this._getRGBnucleotids("AdobeRGB");

        var rgbs =
            [
                this._deGamma(this._normaliz(this.r)),
                this._deGamma(this._normaliz(this.g)),
                this._deGamma(this._normaliz(this.b))
            ];


        console.log(nucleotids);
        console.log("_gamma：" + this._gamma);
        //[[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]];


        x = this._arrayProduct(rgbs, nucleotids[0]);
        y = this._arrayProduct(rgbs, nucleotids[1]);
        z = this._arrayProduct(rgbs, nucleotids[2]);

        return [x, y, z]
        console.log(this._gamma + "this._gamma");
        console.log([x, y, z]);
    }


}

var test_color


test_color = new ColorRNA(213, 113, 90);
test_color._dLV = 1;
var test_color2 = new ColorRNA(213, 113, 90);


console.log(test_color.RGBstring());
console.log("=========test_color.RGB_to_XYZ()===========");
console.log(test_color.RGB_to_XYZ());
console.log(test_color.RGBstring());
console.log("====================");


//document.getElementById("color").style.background = test_color.RGBstring();
//document.getElementById("color").style.color = test_color.RGBstring();
//document.getElementById("color").style.fontSize = "32pt";

