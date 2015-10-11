#ColorRNA.js
Color & colorspace converter with Javascript; 


����һ�� Javascript ��ɫ�ʡ�ɫ�ʿռ�ת�������⡣
������������и���ɫ��ֵ�Ĳ�����


**�����ڻ�δ��ɡ�**


###ת�� RGB ɫ�ʿռ�
֧������ RGB ɫ�ʿռ�֮����ɫֵ�Ļ��� ��Adobe RGB, Apple RGB, Best RGB, Beta RGB, BruceRGB, CIERGB, ColorMatchRGB, ECIRGBv2, DonRGB4, EktaSpacePS5, NTSC RGB, PALSECAM RGB, ProPhotoRGB, SMPTEC RGB, WideGamut RGB��

����֧�ְ׵�У����֧�����°׵�ο����գ�A, B, C, D50, D55, D65, D75, E, F2, F7, F11��


###ת������ RGB ��ɫ��ģ��
֧������ɫ��ģ�͵�ת����HSL,HSL240(Windows ʰɫ��), HSL255(MS Officeʰɫ��), HSV��HSB��, HWB, CMY, CMYK��

###ת���ο�ɫ�ʿռ�
֧�����²ο�ɫ�ʿռ��ת����CIE Lab, CIE Luv, CIE XYZ, CIE xyY ,CIE LCHab;
�ڲ�ɫ��ʹ�� CIE XYZ �洢��

###ɫ����Զȼ���
֧������ɫ����㷽����DeltaE 1994, DeltaE 2000, DeltaE CMC;
֧�����»Զȼ��㷽����CCIR 601, Rec 709, WCAGluma;
֧�� WCAG contrast �Աȶȼ���;

###����
������ɫ�Ĺ�����������


##ʹ��


```js
var color1 = new ColorRNA();
````

ÿһ�� ColorRNA ����ʵ������һ����ɫ��ColorRNA �ڲ�ʹ�� CIE XYZ �洢��ɫֵ��


###ָ����ɫ


```js
var color1 = new ColorRNA("#FF0101");  // 16 ���� RGB ɫ��ֵ��00~FF���ַ���
var color2 = new ColorRNA(255,1,1);  // RGB ɫ��ֵ��0~255������
var color3 = new ColorRNA([255,1,1]);  // RGB ɫ��ֵ��0~255������

color1.rgb([10, 20, 107]);
color1.rgb("#2F4101");
color1.rgb(44,21,211);
```

�� ColorRNA ����ʵ������ʱ���ô��ݲ�������ָ����ɫ���ɴ��� RGB ��Ĭ��Ϊ sRGB ɫ�ʿռ䣩ֵ��Ҳ���Դ��� RGB ֵ��������� 16 ���ƴ����ַ�����

������ʹ�ÿ��� `ColorRNA.rgb(r,g,b)` ����ָ����ɫ���÷��ʹ���ʱһ����

#### ָ��ɫ�ʿռ�
```js
//֧�ֵ� RGB ɫ�ʿռ䣺
color1.sRGB ([10, 20, 107]);
color1.AdobeRGB (44, 21, 211);
color1.AppleRGB (44, 21, 211);
color1.BestRGB (44, 21, 211);
color1.BetaRGB (44, 21, 211);
color1.BruceRGB (44, 21, 211);
color1.CIERGB (44, 21, 211);
color1.ColorMatchRGB (44, 21, 211);
color1.DonRGB4 (44, 21, 211);
color1.ECIRGBv2 (44, 21, 211);
color1.EktaSpacePS5 (44, 21, 211);
color1.NTSCRGB (44, 21, 211);
color1.PALSECAMRGB (44, 21, 211);
color1.ProPhotoRGB (44, 21, 211);
color1.SMPTECRGB (44, 21, 211);
color1.WideGamutRGB (44, 21, 211);
```

��ʹ�� `ColorRNA.rgb(r,g,b)` һ������������ 16 ��ָ��ɫ�ʿռ���ɫֵ�ķ������÷��� `ColorRNA.rgb(r,g,b)`  ��ȫһ�������� `ColorRNA.rgb (r,g,b)`  ��  `ColorRNA.sRGB (r,g,b)` Ч����һ���ģ�`ColorRNA.rgb (r,g,b)` ʹ�� sRGB ɫ�ʿռ䡣


###����ɫ��

```js
var color1 = new ColorRNA(10,235,245);

color1.rgb ()  // [10, 235, 245]
color1.sRGB ()  // [10, 235, 245]
color1.getHex () // #0AEBF5

color1.AdobeRGB ()  // [133, 234, 244]
color1.getHex () // #85EAF4

color1.AppleRGB ()  // [52, 233, 243]
color1.getHex () // #34E9F3

color1.ProPhotoRGB ()  // [154, 218, 239]
color1.getHex () // #9ADAEF

```







