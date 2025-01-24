

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sengo2 {
    //% block=" Initialize  Sengo2  port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        if (Generator.board === 'esp32') {
            Generator.addImport("from mpython import *");
        }
        else if (Generator.board === 'microbit') {
            Generator.addImport("from microbit import *");
        }

        Generator.addImport("from Sengo2 import *");
        Generator.addDeclaration(`sengo2Object`, `sengo2 = Sengo2(${addr})`, true);
        Generator.addCode(`sengo2.begin(${mode})`);
    }

    //% block=" Set  Sengo2  LEDs' color [DETECTED_COLOR] when targets were detected otherwise [UNDETECTED_COLOR] luma(1-15) [LEVAL] " blockType="command"
    //% DETECTED_COLOR.shadow="dropdown" DETECTED_COLOR.options="LED_COLOR"
    //% UNDETECTED_COLOR.shadow="dropdown" UNDETECTED_COLOR.options="LED_COLOR"  
    //% LEVAL.shadow="range"  LEVAL.params.min=1   LEVAL.params.max=15   LEVAL.defl=1  
    export function LedSetColor(parameter: any) {
        let detected_color = parameter.DETECTED_COLOR.code;
        let undetected_color = parameter.UNDETECTED_COLOR.code;
        let leval = parameter.LEVAL.code;
        Generator.addCode(`sengo2.LedSetColor(${detected_color},${undetected_color},${leval});`);
    }

    //% block=" Set  Sengo2  [VISION_STA]  algo [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"   
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;

        if (vision_sta == "ON") {
            Generator.addCode(`sengo2.VisionBegin(${vision_type})`);
        } else {
            Generator.addCode(`sengo2.VisionEnd(${vision_type})`);
        }
    }

    //% block=" Set  Sengo2  algo[VISION_TYPE]   [NUM] sets of params" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM" VISION_TYPE.defl="Sengo2::kVisionColor"
    //% NUM.shadow="range"  NUM.params.min=1   NUM.params.max=25   NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sengo2.SetParamNum(${vision_type},${num})`);
    }

    //% block=" Set  Sengo2  algo Color  x-coord[XVALUE] y-coord [YVALUE] width[WIDTH] height[HIGHT] paramset[NUM]"
    //% NUM.shadow="range"  NUM.params.min=1   NUM.params.max=25   NUM.defl=1
    //% XVALUE.shadow="number"  XVALUE.defl=50
    //% YVALUE.shadow="number"  YVALUE.defl=50
    //% WIDTH.shadow="number"  WIDTH.defl=3
    //% HIGHT.shadow="number"  HIGHT.defl=4
    export function SetColorParam(parameter: any) {

        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addCode(`sengo2.SetParam(sengo2_vision_e.kVisionColor,[${x}, ${y}, ${w}, ${h}, 0],${num})`);
    }


    //% block=" Set  Sengo2  algo Blob  min-width[WIDTH] min-height[HIGHT] color [COLOR_LABLE] paramset[NUM]" blockType="command"
    //% NUM.shadow="range"  NUM.params.min=1   NUM.params.max=25   NUM.defl=1
    //% WIDTH.shadow="number"  WIDTH.defl=3
    //% HIGHT.shadow="number"  HIGHT.defl=4
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let num = parameter.NUM.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addCode(`sengo2.SetParam(sengo2_vision_e.kVisionBlob,[0, 0, ${w}, ${h}, ${l}],${num})`);
    }

    //% block=" Set  Sengo2  algo Blob  max num of blobs for each color(1-5)[MODE]"
    //% MODE.shadow="range"  MODE.params.min=1   MODE.params.max=5   MODE.defl=1
    export function SetMaxBlobParam(parameter: any) {
        let mode = parameter.MODE.code;
        Generator.addCode(`sengo2.VisionSetMode(sengo2_vision_e.kVisionBlob,${mode})`);
    }

    //% block=" Set  Sengo2  algo AprilTag  standard[MODE]"
    //% MODE.shadow="dropdown" MODE.options="APRILTAG_MODE"
    export function SetMaxAprilTagParam(parameter: any) {
        let mode = parameter.MODE.code;
        Generator.addCode(`sengo2.VisionSetMode(sengo2_vision_e.kVisionAprilTag, ${mode})`);
    }

    //% block=" Set  Sengo2  algo Line  max num of lines(1-5)[MODE]"
    //% MODE.shadow="range"  MODE.params.min=1   MODE.params.max=5   MODE.defl=1
    export function SetMaxLineParam(parameter: any) {
        let mode = parameter.MODE.code;
        Generator.addCode(`sengo2.VisionSetMode(sengo2_vision_e.kVisionLine, ${mode})`);
    }

    //% block=" Set  Sengo2  algo[VISION_TYPE]  [COLOR_LABLE] ID [NUM]"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="OPERA_VISION"
    //% NUM.shadow="range"  NUM.params.min=1   NUM.params.max=11   NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="OPERA_PARAM"
    export function SetOperaParam(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addCode(`sengo2.SetParam(${vision_type},[0, 0,0, 0, ${l}], ${num});`);
    }
    //% block="  Sengo2  algo[VISION_TYPE]  num of results" blockType="reporter" 
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"   
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sengo2.GetValue(${vision_type}, sentry_obj_info_e.kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo2  algo Color  [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR"   
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO_COLOR.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo2  algo[VISION_TYPE]   [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"   
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo2.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo2  algo Line   [OBJ_INFO] of result [NUM]" blockType="reporter"  
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE"   
    export function GetLineValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionLine,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo2  algo QrCode   [OBJ_INFO] of result [NUM]" blockType="reporter"  
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR"   
    export function GetQrCodeValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionQrCode,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo2  algo QrCode  string of decoding result" blockType="reporter"
    export function GetQrCodeValueStr(parameter: any) {

        Generator.addCode([`sengo2.GetQrCodeValue()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo2  algo Color  recognized [COLOR_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"   
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionColor,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo2  algo Blob  detected [COLOR_LABLE] blob result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"   
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionBlob,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo2  algo Card  recognized [CARD_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"   
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVisionCard,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo2  algo 20Class  recognized [Class20_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"   
    export function GetClass20Lable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sengo2.GetValue(sengo2_vision_e.kVision20Classes,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
