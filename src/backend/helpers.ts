/**
 * @method throttle
 * @param callback A function to throttle
 * @param ms A number of milliseconds to use as throttling interval
 * @returns A function that limits input function, `callback`, from being called more than once every `ms` milliseconds
 *
 */
export const throttle = (callback: Function, ms: number): Function => {
  // Initialize boolean flags for callback, throttledFunc
  let isOnCooldown = false;
  let isCallQueued = false;

  // Wrap the passed-in function, f, in a callback function that "throttles"
  // (puts a limit on) the number of calls that can be made to function, f
  // in a given period of time (ms), t
  const throttledFunc = (): any => {
    // CASE 1: In cooldown mode and we already have a function waiting to be executed,
    //         so do nothing
    if (isOnCooldown && isCallQueued) return;

    // CASE 2: In cooldown mode, but we have no functions waiting to be executed,
    //         so just make note that we now have a call waiting to be executed and return
    if (isOnCooldown) {
      isCallQueued = true;
      return;
    }

    // CASE 3: If we are ready to "fire":
    // Execute the function, f, immediately
    callback();
    // Initiate a new cooldown period and reset the "call queue"
    isOnCooldown = true;
    isCallQueued = false;

    // Declare a function that checks whether we have
    // another function to be executed right after.
    const runAfterTimeout = (): any => {
      if (isCallQueued) {
        isCallQueued = false;
        isOnCooldown = true; // not needed I think
        callback();
        setTimeout(runAfterTimeout, ms);
        return;
      }
      isOnCooldown = false;
    };

    setTimeout(runAfterTimeout, ms);
  };

  return throttledFunc;
};
