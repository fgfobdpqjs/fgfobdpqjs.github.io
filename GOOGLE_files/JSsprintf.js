sprintfWrapper={init:function(){var a,b,c,d,e,f,g,h,i,j,l;if("undefined"==typeof arguments)return null;if(arguments.length<1)return null;if("string"!=typeof arguments[0])return null;if("undefined"==typeof RegExp)return null;for(a=arguments[0],b=new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g),c=new Array,d=new Array,e=0,f=0,g=0,h=0,i="",j=null;j=b.exec(a);)j[9]&&(e+=1),f=h,g=b.lastIndex-j[0].length,d[d.length]=a.substring(f,g),h=b.lastIndex,c[c.length]={match:j[0],left:j[3]?!0:!1,sign:j[4]||"",pad:j[5]||" ",min:j[6]||0,precision:j[8],code:j[9]||"%",negative:parseInt(arguments[e])<0?!0:!1,argument:String(arguments[e])};if(d[d.length]=a.substring(h),0==c.length)return a;if(arguments.length-1<e)return null;for(j=null,l=null,l=0;l<c.length;l++)"%"==c[l].code?substitution="%":"b"==c[l].code?(c[l].argument=String(Math.abs(parseInt(c[l].argument)).toString(2)),substitution=sprintfWrapper.convert(c[l],!0)):"c"==c[l].code?(c[l].argument=String(String.fromCharCode(parseInt(Math.abs(parseInt(c[l].argument))))),substitution=sprintfWrapper.convert(c[l],!0)):"d"==c[l].code?(c[l].argument=String(Math.abs(parseInt(c[l].argument))),substitution=sprintfWrapper.convert(c[l])):"f"==c[l].code?(c[l].argument=String(Math.abs(parseFloat(c[l].argument)).toFixed(c[l].precision?c[l].precision:6)),substitution=sprintfWrapper.convert(c[l])):"o"==c[l].code?(c[l].argument=String(Math.abs(parseInt(c[l].argument)).toString(8)),substitution=sprintfWrapper.convert(c[l])):"s"==c[l].code?(c[l].argument=c[l].argument.substring(0,c[l].precision?c[l].precision:c[l].argument.length),substitution=sprintfWrapper.convert(c[l],!0)):"x"==c[l].code?(c[l].argument=String(Math.abs(parseInt(c[l].argument)).toString(16)),substitution=sprintfWrapper.convert(c[l])):"X"==c[l].code?(c[l].argument=String(Math.abs(parseInt(c[l].argument)).toString(16)),substitution=sprintfWrapper.convert(c[l]).toUpperCase()):substitution=c[l].match,i+=d[l],i+=substitution;return i+=d[l]},convert:function(a,b){var c,d;return a.sign=b?"":a.negative?"-":a.sign,c=a.min-a.argument.length+1-a.sign.length,d=new Array(0>c?0:c).join(a.pad),a.left?"0"==a.pad||b?a.sign+a.argument+d.replace(/0/g," "):a.sign+a.argument+d:"0"==a.pad||b?a.sign+d+a.argument:d+a.sign+a.argument}},sprintf=sprintfWrapper.init;