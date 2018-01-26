/*
JUMPER.UV Был создал для управления UV-развёрткой 3D-моделей на основе технологии создания 2D-спрайтов
в компьютерных игр. Особенность работы скрипта заключается в том, что через отдельный сценарий задаётся
последовательность отображения участкой текстуры на 3D-модели. Плюс скрипта в том, что для множества моделей
можно использовать одну универсальную текстуру.
*/



function Jumper( uv, task ){
    
    
        
    var scale = 0; // Размер uv-развёртки
    
    var aY = 0; // Смещение uv-развёртки в зоне A по по оси Y
    var bY = 0; // Смещение uv-развёртки в зоне B по по оси Y
    var cY = 0; // Смещение uv-развёртки в зоне C по по оси Y

    var aX = 0; // Смещение uv-развёртки в зоне A по по оси X
    var bX = 0; // Смещение uv-развёртки в зоне B по по оси X
    var cX = 0; // Смещение uv-развёртки в зоне C по по оси X
    
    //var UVs = Float32Array.from(uv.array); // Данные развёртки, которую в итоге отдаём
    var UVs = Float32Array.from(uv.array);
    
    if (!uv['originalUV']){
        
        // При первой инициации сохраняем исходные данные UV-развёртки.
        // В противном случае данные будут перемножаться не корректно.
        uv['originalUV'] = UVs;
        
    } else {
        
        // При повторном использовании пользуемся только данными из исходника.
        UVs = uv['originalUV'];
    }   
    
    
    // ====== Задаём размер развёртки ==========
    // =========================================
    
    if( task.search('C') != -1 ){  
        
        scale = 8;
        
        console.log('search: C');
        
    } else if ( task.search('B') != -1 ) {   
        
        scale = 4;
        
        console.log('search: B');
        
    } else if ( task.search('A') != -1 ) {  
        
        scale = 2;
        
        console.log('search: A');
        
    } else {  
        
        console.log(' Name problem '); 
        
    }
    
    
    
    // ====== Вычисляем данные местоположения ==========
    // =================================================
    
    if (task.search('A') != -1){
                
        console.log('Start work A');

        if (+task.charAt(1) === 1 || +task.charAt(1) === 2){

            aY = 0.5;

        }

        if (+task.charAt(1) === 3 || +task.charAt(1) === 2){

            aX = 0.5;

        }

        if ( +task.charAt(1) >= 4){
            
            console.log('=== Error vall A ===');
        }


    }
    
    if (task.search('B') != -1){

        console.log('Start work B');

        if (+task.charAt(3) === 1 || +task.charAt(3) === 2){

            bY = 0.25;

        }

        if (+task.charAt(3) === 3 || +task.charAt(3) === 2){

            bX = 0.25;

        }

        if ( +task.charAt(3) >= 4){
            
            console.log('=== Error vall B ===');
            
        }


    }

    if (task.search('C') != -1){

        console.log('Start work C'); 

        if (+task.charAt(5) === 1 || +task.charAt(5) === 2){

            cY = 0.125;

        }

        if (+task.charAt(5) === 3 || +task.charAt(5) === 2){

            cX = 0.125;

        }

        if ( +task.charAt(3) >= 4){
            console.log('=== Error vall C ===');
        }

    }
    
    // ====== Делаем вычисления ========================
    // =================================================
    
    var zauza = new Float32Array( UVs.length );
    
    for (var i = 0; i < UVs.length; i++) {

        if ( i & 1 ) {
            
            zauza[i] = UVs[i] / 2 + aY + bY + cY;
            
        } else {
            
            zauza[i] = UVs[i] / 2 + aX + bX + cX;
            
        }


    }
    uv.array = zauza;
    
    return uv;
    
}