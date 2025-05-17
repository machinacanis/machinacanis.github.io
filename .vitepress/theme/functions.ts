type Post = {
  frontMatter: {
    date: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
  };
  regularPath: string;
};

const pattern =
  /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g;

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined;

export function initTags(posts: Post[]): Record<string, Post[]> {
  const data: Record<string, Post[]> = {};
  posts.forEach((post) => {
    post.frontMatter.tags?.forEach((tag) => {
      data[tag] = data[tag] || [];
      data[tag].push(post);
    });
  });

  return Object.fromEntries(
    Object.entries(data).sort(
      ([, posts1], [, posts2]) => posts2.length - posts1.length
    )
  );
}

export function initCategory(posts: Post[]) {
  const data: Record<string, Post[]> = {};
  for (let index = 0; index < posts.length; index++) {
    const element = posts[index];
    const category = element.frontMatter.category;
    if (category) {
      if (data[category]) {
        data[category].push(element);
      } else {
        data[category] = [];
        data[category].push(element);
      }
    }
  }
  return data;
}

export function useYearSort(post: Post[]) {
  const data: Post[][] = [];
  let year = "0";
  let num = -1;
  for (let index = 0; index < post.length; index++) {
    const element = post[index];
    if (element.frontMatter.date) {
      const y = element.frontMatter.date.split("-")[0];
      if (y === year) {
        data[num].push(element);
      } else {
        num++;
        data[num] = [];
        data[num].push(element);
        year = y;
      }
    }
  }
  return data;
}

export function countWord(data: string) {
  const m = data.match(pattern);
  let count = 0;
  if (!m) {
    return 0;
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

// 彩虹背景动画样式
export function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}
