<div class="w-full flex  ">
   <div class="bg-black-100 dark:bg-black-600 p-2 rounded-lg flex  gap-1 items-center">
    <div class="loadingDot bg-black-500 dark:bg-black-300 loadingDot--1">
    </div>
    
    <div class="loadingDot bg-black-500 dark:bg-black-300 loadingDot--2">
    </div>
    
    <div class="loadingDot bg-black-500 dark:bg-black-300 loadingDot--3">
    </div>
    
   </div>
</div>

<style>
.loadingDot {
    width: 0.5rem;
    height: 0.5rem;
    animation: 0.5s infinite alternate anim-loadingDot;
    animation-timing-function: ease-in-out;
    border-radius: 999px;
}

/* set animation delay for each loading dot */
.loadingDot--2 {
    animation-delay: .12s;
}

.loadingDot--3 {
    animation-delay: .24s;
}



/* keyframes for loading dot */
@keyframes anim-loadingDot {
    0% {
        transform: scale( 1 );
    }
    
    100% {
        transform: scale( .3 );
    }
}
</style>