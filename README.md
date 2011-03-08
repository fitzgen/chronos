# Chronos

Why? Read [JavaScript Timer Congestion][blog post].

Chronos implements the WindowTimers interface defined by HTML 5.

    interface WindowTimers {
      long setTimeout(in any handler, in optional any timeout, in any... args);
      void clearTimeout(in long handle);
      long setInterval(in any handler, in optional any timeout, in any... args);
      void clearInterval(in long handle);
    };

[blog post]: http://fitzgeraldnick.com/weblog/40/
