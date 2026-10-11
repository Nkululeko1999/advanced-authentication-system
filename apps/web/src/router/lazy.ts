const lazyRoute = async (
  loader: () => Promise<{ default: React.ComponentType }>,
): Promise<{ Component: React.ComponentType }> => {
  const { default: Component } = await loader();
  return { Component };
};

export default lazyRoute;
