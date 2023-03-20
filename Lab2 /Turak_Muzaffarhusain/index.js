const arrayusage= require('./arrayUtils');
const objectusage=require('./objUtils');
const stringusage=require('./stringUtils'); 
//console.log(arrayusage.average([[2,3,9],[1,4,7]]));

try 
{
    const mean=arrayusage.average([[1,3,4],[4,2,3]]);
    console.log('average passed successfully',mean);
}

catch (e) 
{
     console.error('average failed test case');
}

 try {
    const mean2=arrayusage.average(1234);
    console.error('average did not error');
 } catch (e) {
    console.log('average failed successfully');
 }

try 
{
    const mode=arrayusage.modeSquared([1, 2, 3, 3, 4]);
    console.log('mode passed successfully',mode);
}
catch (e) 
{
     console.error('mode failed test case');
}

try 
{
    const mode2=arrayusage.modeSquared([]);
    console.log(' mode did not error');
}
catch (e) 
{
     console.error('mode failed successfully');
}

try 
{
    const median=arrayusage.medianElement([5, 6, 7]);
    console.log('median passed successfully',median);
}
catch (e) 
{
     console.error('median failed test case');
}

try 
{
    const median2=arrayusage.medianElement([]);
    console.log(' median did not error');
}
catch (e) 
{
     console.error('median failed successfully');
}

try 
{
    const merge=arrayusage.merge([1, 2, 3], [3, 1, 2]);
    console.log('merge passed successfully',merge);
}
catch (e) 
{
     console.error('merge failed test case');
}

try 
{
    const merge2=arrayusage.merge([], ['ab', 'ts']);
    console.log(' merge did not error');
}
catch (e) 
{
     console.error('merge failed successfully');
}

try 
{
    const sort=stringusage.sortString('123 FOO BAR!');
    console.log('sortString passed successfully',sort);
}
catch (e) 
{
     console.error('sortString failed test case');
}

try 
{
    const sort2=stringusage.sortString();
    console.log(' sortString did not error');
}
catch (e) 
{
     console.error('sortString failed successfully');
}

try 
{
    const replace=stringusage.replaceChar("Daddy", 2);
    console.log('replaceChar passed successfully',replace);
}
catch (e) 
{
     console.error('replaceChar failed test case');
}

try 
{
    const replace2=stringusage.replaceChar("foobar", 0);
    console.log(' replaceChar did not error');
}
catch (e) 
{
     console.error('replaceChar failed successfully');
}

try 
{
    const mashup=stringusage.mashUp("Patrick", "Hill", "$");
    console.log('mashUp passed successfully',mashup);
}
catch (e) 
{
     console.error('mashUp failed test case');
}

const first = {a: 2, b: 4};
const second = {a: 5, b: 4};
const third = {a: 2, b: {x: 7}};
const fourth = {a: 3, b: {x: 7, y: 10}};


try 
{
    const common=objectusage.commonKeys(first, second);
    console.log(' commonkeys passed successfully',common);
}
catch (e) 
{
     console.error('commonkeys failed successfully');
}

try 
{
    const common2=objectusage.commonKeys({first});
    console.log('commonKeys did not error');
}
catch (e) 
{
     console.error('commonKeys failed successfully');
}

try 
{
    const flip=objectusage.flipObject({ a: 3, b: 7, c: 5 });
    console.log(' flipObject passed successfully',flip);
}
catch (e) 
{
     console.error('flipObject failed successfully');
}

try 
{
    const flip2=objectusage.flipObject();
    console.log('flipObject passed successfully',flip2);
}
catch (e) 
{
     console.error('flipObject failed successfully');
}
